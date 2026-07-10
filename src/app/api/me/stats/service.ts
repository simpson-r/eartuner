import { Exercise, Prisma, Streak } from '@prisma/client';

import {
  AccuracyStatsMap,
  ExerciseMeta,
  ExerciseTypeKey,
  exerciseTypes,
  AccuracyMapResult,
} from './types';
import { daysBetween } from '@/utils/date';

/** TYPES */
type ExerciseAggregate = Prisma.GetExerciseAggregateType<{
  where: { userId: string };
  _count: { id: true };
  _sum: { numQuestions: true; durationSec: true };
  _avg: { score: true };
}>;

type ExerciseGroupBy = Awaited<
  Prisma.GetExerciseGroupByPayload<{
    by: ['exerciseType'];
    where: { userId: string };
    _count: { id: true };
    _sum: { numQuestions: true };
    _avg: { score: true };
  }>
>[number];


/**
 * =================
 * SERVICE METHODS
 * =================
 */

/**
 * Shapes a raw `exercise.aggregate` result into the summary section of the /me/stats response.
 */
export const buildSummary = (agg: ExerciseAggregate) => ({
  averageScore: agg?._avg?.score?.toFixed(2) ?? 0,
  attempts: agg?._count?.id ?? 0,
  questions: agg?._sum?.numQuestions ?? 0,
  duration: agg?._sum?.durationSec ?? 0,
});

/**
 * Shapes a single group from `exercise.groupBy` into one entry of the breakdownByType array.
 */
export const buildBreakdownSummary = (group: ExerciseGroupBy) => ({
  type: group.exerciseType,
  averageScore: group._avg?.score ?? 0,
  questions: group._sum?.numQuestions ?? 0,
  attempts: group._count?.id,
});

/**
 * Computes the user's current/longest streak from their stored streak row plus today's date.
 * If `streak.lastDate` is more than 1 day ago, the current streak has lapsed and resets to 0.
 */
export const buildStreak = (streak: Streak | null, totalAttempts: number) => {
  const today = new Date();
  const delta = streak?.lastDate ? daysBetween(streak.lastDate, today) : null;
  const current = (delta ?? 0) > 1 ? 0 : streak?.current;
  return streak
    ? {
        current,
        longest: streak.longest,
        started: streak.startedAt,
        lastDate: streak.lastDate,
        totalAttempts,
        hasCompletedToday: delta === 0,
      }
    : {
        current: 0,
        longest: 0,
        started: null,
        lastDate: null,
        totalAttempts: 0,
        hasCompletedToday: false,
      };
};

/**
 * Tallies correct/incorrect counts per (exerciseType, expected) pair  across a user's exercises,
 * using each exercise's `meta` field as the list of individual question attempts.
 */
export const buildAccuracyByExerciseType = (
  exercises: Partial<Exercise>[],
): AccuracyMapResult => {
  const stats = exercises.reduce<AccuracyStatsMap>((acc, exercise) => {
    const type = exercise.exerciseType;

    if (!isExerciseTypeKey(type)) return acc;

    const questions = Array.isArray(exercise.meta)
      ? (exercise.meta as unknown as ExerciseMeta)
      : [];

    acc[type] ??= {};

    for (const question of questions) {
      const expected = question.expected;

      acc[type][expected] ??= {
        expected,
        correct: 0,
        incorrect: 0,
      };

      if (question.correct) {
        acc[type][expected].correct += 1;
      } else {
        acc[type][expected].incorrect += 1;
      }
    }

    return acc;
  }, {});

  return exerciseTypes.reduce<AccuracyMapResult>(
    (rowsMap, type) => {
      const typeStats = stats[type] ?? {};

      rowsMap[type] = Object.values(typeStats).map((item) => {
        const total = item.correct + item.incorrect;

        return {
          expected: item.expected,
          total,
          accuracy:
            total === 0 ? 0 : Math.round((item.correct / total) * 10000) / 100,
        };
      });

      return rowsMap;
    },
    {
      Interval: [],
      Chord: [],
      Scale: [],
      ScaleDegree: [],
    },
  );
};

const isExerciseTypeKey = (type: unknown): type is ExerciseTypeKey => {
  return exerciseTypes.includes(type as ExerciseTypeKey);
};

import { Exercise } from '@prisma/client';
import {
  AccuracyStatsMap,
  ExerciseMeta,
  ExerciseTypeKey,
  exerciseTypes,
  AccuracyMapResult,
} from './types';

const isExerciseTypeKey = (type: unknown): type is ExerciseTypeKey => {
  return exerciseTypes.includes(type as ExerciseTypeKey);
};

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

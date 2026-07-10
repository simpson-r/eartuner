import { NextResponse } from 'next/server';

import { auth } from '@/auth/auth';
import db from '@/db/client';

import { daysBetween } from '../../../../../utils';
import { buildAccuracyByExerciseType } from './util';

/**
 * GET /api/me/stats
 *
 * Fetches the authenticated user's stats.
 *
 * Response:
 *   200 OK - JSON object containing an aggregated summary of statistics broken down by type, as well as, streak data
 *   401 Unauthorized - if the user is not authenticated
 */
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({}, { status: 401 });
  }
  const userId = session.user.id;

  // db queries for aggregates, exercise, and streak data
  const [summaryAgg, breakdownAgg, exercises, streak] = await Promise.all([
    db.exercise.aggregate({
      where: { userId },
      _count: { id: true },
      _sum: { numQuestions: true, durationSec: true },
      _avg: { score: true },
    }),

    db.exercise.groupBy({
      by: ['exerciseType'],
      where: { userId },
      _count: { id: true },
      _sum: { numQuestions: true },
      _avg: { score: true },
    }),
    db.exercise.findMany({
      where: { userId },
      select: {
        exerciseType: true,
        meta: true,
      },
    }),
    db.streak.findUnique({ where: { userId } }),
  ]);


  const summary = {
    averageScore: summaryAgg._avg.score?.toFixed(2) ?? 0,
    attempts: summaryAgg._count.id,
    questions: summaryAgg._sum.numQuestions ?? 0,
    duration: summaryAgg._sum.durationSec ?? 0,
  };

  const breakdownByType = breakdownAgg.map((group) => ({
    type: group.exerciseType,
    averageScore: group._avg.score ?? 0,
    questions: group._sum.numQuestions ?? 0,
    attempts: group._count.id,
  }));


  const questionAccuracyByType = buildAccuracyByExerciseType(exercises);


  // derived values for streak data
  const today = new Date();
  const delta = streak?.lastDate ? daysBetween(streak.lastDate, today) : null;
  const current = (delta ?? 0) > 1 ? 0 : streak?.current;

  const streakData = streak
    ? {
        current,
        longest: streak.longest,
        started: streak.startedAt,
        lastDate: streak.lastDate,
        totalAttempts: summaryAgg._count.id ?? 0,
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

  return NextResponse.json({
    summary,
    breakdownByType,
    streak: streakData,
    questionAccuracyByType,
  });
}




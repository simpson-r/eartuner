import { NextResponse } from 'next/server';

import { auth } from '@/auth/auth';
import db from '@/db/client';
import {
  buildAccuracyByExerciseType,
  buildBreakdownSummary,
  buildStreak,
  buildSummary,
} from './service';

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

  // 1. db queries for aggregates, exercise, and streak data
  const [summaryAgg, breakdownAgg, exercises, streakData] = await Promise.all([
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

  // 2. build response shape
  const summary = buildSummary(summaryAgg);
  const streak = buildStreak(streakData, summaryAgg._count.id);
  const breakdownByType = breakdownAgg.map((group) =>
    buildBreakdownSummary(group),
  );
  const questionAccuracyByType = buildAccuracyByExerciseType(exercises);

  return NextResponse.json({
    summary,
    breakdownByType,
    streak,
    questionAccuracyByType,
  });
}

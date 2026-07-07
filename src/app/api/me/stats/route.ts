import { NextResponse } from 'next/server';

import { auth } from '@/auth/auth';
import db from '@/db/client';

/**
 * GET /api/me/stats
 *
 * Fetches the authenticated user's stats.
 *
 * Response:
 *   200 OK - JSON object containing a list of exercises:
 *  {
 *    totalAttempts: number;
 *    averageScore: number;
 *    bestScore: number;
 *    totalQuestions: number;
 *   }
 *
 *   401 Unauthorized - if the user is not authenticated
 *   404 Not Found - if no exercise exists with the given ID
 */
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({}, { status: 401 });
  }
  const userId = session.user.id;

  const [summary, stats] = await Promise.all([
    db.exercise.aggregate({
      where: { userId },
      _count: { id: true },
      _avg: { score: true },
      _max: { score: true },
      _sum: { numQuestions: true, durationSec: true },
    }),
    db.exercise.groupBy({
      by: ['exerciseType'],
      where: { userId },
      _sum: { numQuestions: true, durationSec: true },
      _avg: { score: true },
      _count: { id: true },
    }),
  ]);

  if (!summary || !stats) {
    return NextResponse.json(null, { status: 404 });
  }

  // create array of aggregate broken down by type
  const breakdownByType = stats.map((stat) => {
    return {
      type: stat.exerciseType,
      questions: stat._sum.numQuestions ?? 0,
      attempts: stat._count.id ?? 0,
      averageScore: stat._avg.score ?? 0,
    };
  });

  return NextResponse.json({
    summary: {
      averageScore: summary._avg.score
        ? Math.round(summary._avg.score * 100) / 100
        : 0,
      totalAttempts: summary._count.id ?? 0,
      totalQuestions: summary._sum.numQuestions,
      totalDuration: summary._sum.durationSec,
    },
    breakdownByType,
  });
}

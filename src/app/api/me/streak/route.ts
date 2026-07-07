import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { daysBetween } from '@/utils/helpers';

/**
 * GET /api/me/streak
 *
 * Fetches the authenticated user's streak.
 *
 * Response:
 *   200 OK - JSON object containing a list of exercises:
 *  {
 *    current: number;
 *    longest: number;
 *    startedAt: string | null;
 *    lastDate: string | null;
 *    totalAttempts: number;
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
  const [streak, stats] = await Promise.all([
    db.streak.findUnique({ where: { userId } }),
    db.exercise.aggregate({ where: { userId }, _count: { id: true } }),
  ]);

  if (!streak) {
    return NextResponse.json(null, { status: 404 });
  }

  const today = new Date();
  const delta = streak.lastDate ? daysBetween(streak.lastDate, today) : null;
  const current = (delta ?? 0) > 1 ? 0 : streak.current;

  return NextResponse.json({
    current,
    longest: streak?.longest ?? 0,
    startedAt: streak?.startedAt,
    lastDate: streak?.lastDate,
    totalAttempts: stats._count.id ?? 0,
    hasCompletedToday: delta === 0,
  });
}

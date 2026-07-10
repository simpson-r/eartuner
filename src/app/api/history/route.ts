import { NextResponse } from 'next/server';

import { auth } from '@/auth/auth';
import db from '@/db/client';
import { daysBetween } from '@/utils/date';

/**
 * POST /api/exercises/${exerciseId}/attempts
 *
 * Create a new exercise attempt for the authenticated user.
 *
 * Request Body:
 *   {
 *     "exerciseType": number,
 *     "numQuestions": number,
 *     "score": number,
 *     "durationSec": number,
 *     "meta": ExerciseMetadata[];
 *   }
 *
 * Response:
 *   200 OK - JSON object containing the updated exercise data:
 *     { "id": string }
 *
 *   401 Unauthorized - if the user is not authenticated
 *   404 Not Found - if no exercise exists with the given ID
 */
export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const { durationSec, exerciseType, numQuestions, score, meta } = body;
  const userId = session.user.id;
  const result = await db.$transaction(async (tx) => {
    // 1. find streak
    const streak = await tx.streak.findUnique({
      where: { userId },
    });
    // 2. update/create streak
    const today = new Date();
    if (streak) {
      const delta = streak.lastDate
        ? daysBetween(streak.lastDate, today)
        : null;

      const continueStreak = delta === 1;
      const alreadyUpdated = delta === 0;
      const current = continueStreak ? streak.current + 1 : 1;

      if (!alreadyUpdated) {
        await tx.streak.update({
          where: { userId },
          data: {
            current,
            longest: current > streak.longest ? current : streak.longest,
            startedAt: continueStreak ? streak.startedAt : today,
            lastDate: today,
          },
        });
      }
    } else {
      await tx.streak.create({
        data: {
          userId,
          current: 1,
          longest: 1,
          startedAt: today,
          lastDate: today,
        },
      });
    }

    // 3. create exercise record
    return await tx.exercise.create({
      data: {
        exerciseType,
        meta,
        userId: session.user.id,
        numQuestions: Number(numQuestions),
        score: Number(score),
        ...(durationSec ? { durationSec: Number(durationSec) } : {}),
      },
      select: { id: true, score: true, durationSec: true, numQuestions: true },
    });
  });

  return NextResponse.json({ attempt: result });
}

/**
 * DELETE /api/me/history
 *
 * Deletes the authenticated user's exercises and resets their streak.
 *
 * Response:
 *   204 No Content
 *   401 Unauthorized - if the user is not authenticated
 */
export async function DELETE() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({}, { status: 401 });
  }

  const userId = session.user.id;

  await db.$transaction([
    db.exercise.deleteMany({ where: { userId } }),
    db.streak.updateMany({
      where: { userId },
      data: {
        current: 0,
        longest: 0,
        startedAt: null,
        lastDate: null,
      },
    }),
  ]);

  return new Response(null, { status: 204 });
}

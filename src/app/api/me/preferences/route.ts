import { NextResponse } from 'next/server';

import { auth } from '@/auth/auth';
import db from '@/db/client';

/**
 * GET /api/me/preferences
 *
 * Fetches the authenticated user's data
 *
 * Response:
 *   200 OK - JSON object containing a list of exercises:
 *  {
 *    preferences: {
 *      lessonSoundEffects: boolean;
 *      instrument: Instrument;
 *   }
 *
 *   401 Unauthorized - if the user is not authenticated
 *   404 Not Found - if no user exists with the given ID
 */
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({}, { status: 401 });
  }
  const userId = session.user.id;

  const preferences = await db.userPreferences.upsert({
    where: { userId },
    select: { defaultInstrument: true, lessonSoundEffects: true },
    create: { userId },
    update: {},
  });

  return NextResponse.json({ preferences });
}

/**
 * PATCH /api/me/preferences
 *
 * Updates the authenticated user's preferences
 *
 * Response:
 *   200 OK - JSON object containing a list of exercises:
 *  {
 *    preferences: {
 *      lessonSoundEffects: boolean;
 *      instrument: Instrument;
 *   }
 *
 *   401 Unauthorized - if the user is not authenticated
 *   404 Not Found - if no user exists with the given ID
 */
export async function PATCH(request: Request) {
  const session = await auth();


  if (!session?.user?.id) {
    return NextResponse.json({}, { status: 401 });
  }

  const data = await request.json();
  const userId = session.user.id;

  const preferences = await db.userPreferences.update({
    where: { userId },
    data,
  });

  return NextResponse.json({ preferences });
}

import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';

/**
 * DELETE /api/me
 *
 * Deletes the authenticated user's account and all associated data
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

  await db.user.delete({ where: { id: userId } });

  return new Response(null, { status: 204 });
}

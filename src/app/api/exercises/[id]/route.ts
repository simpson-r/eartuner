import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import db from "@/core/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type Param = { params: { id: string } };

/**
 * GET /api/exercises/:id
 *
 * Fetches a single exercise by its ID.
 *
 * Response:
 *   200 OK - JSON object containing exercise data:
 *     {
 *       "id": string,
 *       "name": string,
 *       "type": "Interval" | "Chord" | "Scale" | "ScaleDegree",
 *       "settings": object
 *     }
 *
 *   401 Unauthorized - if the user is not authenticated
 *   404 Not Found - if no exercise exists with the given ID
 */
export async function GET(_: Request, { params }: Param) {
  const session = await getServerSession(authOptions);

  if (!session?.user) return NextResponse.json({}, { status: 401 });

  const { id: exerciseId } = await params;
  
  const exercise = await db.exercise.findUnique({
    where: { id: exerciseId, userId: session.userId },
    select: { id: true, name: true, type: true, settings: true },
  });

  if (!exercise) return NextResponse.json({}, { status: 404 });

  return NextResponse.json({ exercise });
}

/**
 * PATCH /api/exercises/:id
 *
 * Update an existing exercise by ID owned by requesting user.
 *
 * Request Body:
 *   {
 *     "name"?: string,            // optional new name
 *     "type"?: "Interval" | "Chord" | "Scale" | "ScaleDegree",
 *     "settings"?: object         // JSON config for exercise
 *   }
 *
 * Response:
 *   200 OK - JSON object containing the updated exercise data:
 *     {
 *       "id": string,
 *       "name": string,
 *       "type": "Interval" | "Chord" | "Scale" | "ScaleDegree",
 *       "settings": object
 *     }
 *
 *   401 Unauthorized - if the user is not authenticated
 *   404 Not Found - if no exercise exists with the given ID
 */
export async function PATCH(request: Request, { params }: Param) {
  const session = await getServerSession(authOptions);

  if (!session?.user) return NextResponse.json({}, { status: 401 });

  const exerciseId = params.id;

  const select = {
    id: true,
    name: true,
    type: true,
    settings: true,
    updatedAt: true,
  };

  let exercise = await db.exercise.findFirst({
    where: { id: exerciseId, userId: session.userId },
    select,
  });

  const body = await request.json();
  const { name, type, settings, numQuestions } = body;

  if (!exercise) return NextResponse.json({}, { status: 404 });

  exercise = await db.exercise.update({
    where: { id: exerciseId },
    data: {
      ...(name && { name }),
      ...(type && { type }),
      ...(settings && { settings }),
      ...(numQuestions && { numQuestions }),
    },
    select,
  });

  return NextResponse.json({ exercise });
}

/**
 * DELETE /api/exercises/:id
 *
 * Delete an exercise owned by the authenticated user.
 *
 * Response:
 *   204 No Content - if exercise was successfully deleted
 *   401 Unauthorized - if the user is not authenticated
 *   404 Not Found - if no exercise exists with the given ID
 */
export async function DELETE(_: Request, { params }: Param) {
  const session = await getServerSession(authOptions);

  if (!session?.user) return NextResponse.json({}, { status: 401 });

  const { id: exerciseId } = await params;
  
  const exercise = await db.exercise.findFirst({
    where: { id: exerciseId, userId: session.userId },
    select: { id: true, userId: true },
  });

  if (!exercise) return NextResponse.json({}, { status: 404 });

  await db.exercise.delete({ where: { id: exerciseId } });

  return NextResponse.json({ success: true });
}

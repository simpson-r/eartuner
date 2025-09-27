import db from "@/core/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

/**
 * GET /api/exercises
 *
 * Fetches all exercises for the requesting user.
 *
 * Response:
 *   200 OK - JSON object containing a list of exercises:
 *     {
 *       "id": string,
 *       "name": string,
 *       "type": "Interval" | "Chord" | "Scale" | "ScaleDegree",
 *       "settings": object
 *     }[]
 *
 *   401 Unauthorized - if the user is not authenticated
 *   404 Not Found - if no exercise exists with the given ID
 */
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.userId) return NextResponse.json({}, { status: 401 });

  const exercises = await db.exercise.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { attempts: true } },
    },
  });

  return NextResponse.json(exercises);
}

/**
 * POST /api/exercises
 *
 * Create a new exercise for the authenticated user.
 *
 * Request Body:
 *   {
 *     "name": string,
 *     "type": "Interval" | "Chord" | "Scale" | "ScaleDegree",
 *     "settings": object
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
  const session = await getServerSession(authOptions);

  if (!session?.user) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const { name, type, numQuestions, settings } = body;

  const exercise = await db.exercise.create({
    data: {
      userId: session.userId,
      name,
      type,
      numQuestions: Number(numQuestions),
      settings,
    },
    select: { id: true },
  });

  return NextResponse.json({ exercise });
}

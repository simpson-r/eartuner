import db from "@/core/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.userId) {
    return NextResponse.json({}, { status: 401 });
  }

  const exercises = await db.exercise.findMany({
    where: { userId: session.userId },

    //include: { shots: { take: 10, orderBy: { createdAt: "desc" } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(exercises);
}

// export async function POST(request: Request) {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return NextResponse.json({}, { status: 401 });
//   }

//   const body = await request.json();
//   const { urls, studioName, instanceClass } = body;

//   const project = await db.project.create({
//     data: {
//       imageUrls: urls,
//       name: studioName,
//       userId: session.userId,
//       modelStatus: "not_created",
//       instanceClass: instanceClass || "person",
//       instanceName: process.env.NEXT_PUBLIC_REPLICATE_INSTANCE_TOKEN!,
//       credits: Number(process.env.NEXT_PUBLIC_STUDIO_SHOT_AMOUNT) || 50,
//       version: "V2",
//     },
//   });

//   const buffer = await createZipFolder(urls, project);

//   await s3Client.send(
//     new PutObjectCommand({
//       Bucket: process.env.S3_UPLOAD_BUCKET!,
//       Key: `${project.id}.zip`,
//       Body: buffer,
//     })
//   );

//   return NextResponse.json(project);
// }

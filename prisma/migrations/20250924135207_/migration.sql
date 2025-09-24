/*
  Warnings:

  - The values [Mixed] on the enum `ExerciseType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `verification_tokens` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,name]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Exercise` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ExerciseType_new" AS ENUM ('Interval', 'Chord', 'Scale', 'ScaleDegree');
ALTER TABLE "public"."Exercise" ALTER COLUMN "type" TYPE "public"."ExerciseType_new" USING ("type"::text::"public"."ExerciseType_new");
ALTER TYPE "public"."ExerciseType" RENAME TO "ExerciseType_old";
ALTER TYPE "public"."ExerciseType_new" RENAME TO "ExerciseType";
DROP TYPE "public"."ExerciseType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Exercise" DROP CONSTRAINT "Exercise_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Exercise" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "settings" SET DATA TYPE JSONB;

-- DropTable
DROP TABLE "public"."verification_tokens";

-- CreateTable
CREATE TABLE "public"."Attempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "numQuestions" INTEGER NOT NULL,
    "durationMs" INTEGER,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Attempt_userId_createdAt_idx" ON "public"."Attempt"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Attempt_exerciseId_createdAt_idx" ON "public"."Attempt"("exerciseId", "createdAt");

-- CreateIndex
CREATE INDEX "Exercise_userId_createdAt_idx" ON "public"."Exercise"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_userId_name_key" ON "public"."Exercise"("userId", "name");

-- AddForeignKey
ALTER TABLE "public"."Exercise" ADD CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attempt" ADD CONSTRAINT "Attempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attempt" ADD CONSTRAINT "Attempt_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "public"."Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

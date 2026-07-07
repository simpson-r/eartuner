-- CreateEnum
CREATE TYPE "public"."Instrument" AS ENUM ('Piano', 'Guitar');

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "public"."user_preferences" (
    "userId" TEXT NOT NULL,
    "default_instrument" "public"."Instrument" NOT NULL DEFAULT 'Piano',
    "lesson_sound_effects" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "user_preferences_userId_key" ON "public"."user_preferences"("userId");

-- AddForeignKey
ALTER TABLE "public"."user_preferences" ADD CONSTRAINT "user_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

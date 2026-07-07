/*
  Warnings:

  - You are about to drop the column `settings` on the `exercises` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."exercises" DROP COLUMN "settings",
ADD COLUMN     "meta" JSONB;

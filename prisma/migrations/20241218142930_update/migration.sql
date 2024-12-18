/*
  Warnings:

  - You are about to drop the column `pdatedAt` on the `Match` table. All the data in the column will be lost.
  - Added the required column `udatedAt` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_tournamentId_fkey";

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "pdatedAt",
ADD COLUMN     "udatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "tournamentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE SET NULL ON UPDATE CASCADE;

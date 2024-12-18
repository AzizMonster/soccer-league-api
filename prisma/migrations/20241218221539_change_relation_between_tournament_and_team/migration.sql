/*
  Warnings:

  - You are about to drop the `_stadium_tournaments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_tournamentId_fkey";

-- DropForeignKey
ALTER TABLE "_stadium_tournaments" DROP CONSTRAINT "_stadium_tournaments_A_fkey";

-- DropForeignKey
ALTER TABLE "_stadium_tournaments" DROP CONSTRAINT "_stadium_tournaments_B_fkey";

-- DropTable
DROP TABLE "_stadium_tournaments";

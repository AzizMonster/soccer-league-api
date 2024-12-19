/*
  Warnings:

  - A unique constraint covering the columns `[memberId]` on the table `TeamMember` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_memberId_key" ON "TeamMember"("memberId");

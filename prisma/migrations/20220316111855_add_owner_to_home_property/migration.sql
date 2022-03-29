/*
  Warnings:

  - Added the required column `ownerId` to the `Home` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- <ORIGINAL> ALTER TABLE "Home" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AddForeignKey
-- <ORIGINAL> ALTER TABLE "Home" ADD CONSTRAINT "Home_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Home" ADD COLUMN "ownerId" TEXT;
UPDATE "Home" SET "ownerId" = 'cl0sjlubd0008bgda3ns3a9c1' WHERE "ownerId" IS NULL;

ALTER TABLE "Home" ALTER COLUMN "ownerId" SET NOT NULL;

ALTER TABLE "Home" ADD CONSTRAINT "Home_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


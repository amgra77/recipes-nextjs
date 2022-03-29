/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Home` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `owner_id` to the `Home` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Home" DROP CONSTRAINT "Home_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_ownerId_fkey";

-- AlterTable
ALTER TABLE "Home" RENAME COLUMN "ownerId" TO "owner_id";

-- AlterTable
ALTER TABLE "Recipe" RENAME COLUMN "ownerId" TO "owner_id";

-- AddForeignKey
ALTER TABLE "Home" ADD CONSTRAINT "Home_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

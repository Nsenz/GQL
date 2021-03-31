/*
  Warnings:

  - You are about to drop the `Following` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserFollowing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserFollowing" DROP CONSTRAINT "UserFollowing_followedId_fkey";

-- DropForeignKey
ALTER TABLE "UserFollowing" DROP CONSTRAINT "UserFollowing_followerId_fkey";

-- DropTable
DROP TABLE "Following";

-- DropTable
DROP TABLE "UserFollowing";

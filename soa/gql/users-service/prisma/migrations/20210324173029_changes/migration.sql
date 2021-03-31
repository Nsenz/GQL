/*
  Warnings:

  - You are about to drop the `Followers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FollowersToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FollowersToUser" DROP CONSTRAINT "_FollowersToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FollowersToUser" DROP CONSTRAINT "_FollowersToUser_B_fkey";

-- DropTable
DROP TABLE "Followers";

-- DropTable
DROP TABLE "_FollowersToUser";

-- CreateTable
CREATE TABLE "UserSubscription" (
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "subscriptionId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

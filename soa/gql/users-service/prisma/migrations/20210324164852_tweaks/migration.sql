/*
  Warnings:

  - Added the required column `firstName` to the `Followers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Followers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Followers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Followers" ADD COLUMN     "firstName" VARCHAR(255) NOT NULL,
ADD COLUMN     "lastName" VARCHAR(255) NOT NULL,
ADD COLUMN     "password" VARCHAR(255) NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

/*
  Warnings:

  - You are about to drop the column `UpdateAt` on the `Product` table. All the data in the column will be lost.
  - Added the required column `updateAt` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `UpdateAt`,
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;

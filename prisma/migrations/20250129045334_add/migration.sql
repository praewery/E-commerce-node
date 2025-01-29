/*
  Warnings:

  - You are about to drop the column `OrderedbyId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `OrderedById` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_OrderedbyId_fkey`;

-- DropIndex
DROP INDEX `Order_OrderedbyId_fkey` ON `Order`;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `OrderedbyId`,
    ADD COLUMN `OrderedById` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_OrderedById_fkey` FOREIGN KEY (`OrderedById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

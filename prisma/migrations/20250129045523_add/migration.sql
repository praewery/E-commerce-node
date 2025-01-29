/*
  Warnings:

  - You are about to drop the column `OrderedById` on the `Order` table. All the data in the column will be lost.
  - Added the required column `orderedById` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_OrderedById_fkey`;

-- DropIndex
DROP INDEX `Order_OrderedById_fkey` ON `Order`;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `OrderedById`,
    ADD COLUMN `orderedById` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_orderedById_fkey` FOREIGN KEY (`orderedById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

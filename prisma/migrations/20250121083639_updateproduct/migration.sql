/*
  Warnings:

  - You are about to drop the column `UpdateAt` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `discription` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Product` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_categoryId_fkey`;

-- DropIndex
DROP INDEX `Product_categoryId_fkey` ON `Product`;

-- AlterTable
ALTER TABLE `Category` DROP COLUMN `UpdateAt`,
    DROP COLUMN `discription`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `discription`,
    DROP COLUMN `updateAt`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `categoryId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

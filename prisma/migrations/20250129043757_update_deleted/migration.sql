-- DropForeignKey
ALTER TABLE `ProductOnCart` DROP FOREIGN KEY `ProductOnCart_productId_fkey`;

-- DropIndex
DROP INDEX `ProductOnCart_productId_fkey` ON `ProductOnCart`;

-- AddForeignKey
ALTER TABLE `ProductOnCart` ADD CONSTRAINT `ProductOnCart_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `paymentId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseTime` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paymentId",
DROP COLUMN "purchaseTime",
ADD COLUMN     "paymentCompletedAt" TIMESTAMP(3),
ADD COLUMN     "quantity" INTEGER DEFAULT 1;

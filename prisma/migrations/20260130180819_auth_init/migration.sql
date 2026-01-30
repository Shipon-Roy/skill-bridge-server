/*
  Warnings:

  - The values [PENDING,CONFIRMED] on the enum `BookingStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `endTime` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `tutorProfileId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `availability` on the `TutorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `TutorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `hourlyRate` on the `TutorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `subjects` on the `TutorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TutorProfile` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `user` table. All the data in the column will be lost.
  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `tutorId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Made the column `comment` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `pricePerHr` to the `TutorProfile` table without a default value. This is not possible if the table is not empty.
  - Made the column `bio` on table `TutorProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BookingStatus_new" AS ENUM ('UPCOMING', 'COMPLETED', 'CANCELLED');
ALTER TABLE "public"."Booking" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Booking" ALTER COLUMN "status" TYPE "BookingStatus_new" USING ("status"::text::"BookingStatus_new");
ALTER TYPE "BookingStatus" RENAME TO "BookingStatus_old";
ALTER TYPE "BookingStatus_new" RENAME TO "BookingStatus";
DROP TYPE "public"."BookingStatus_old";
ALTER TABLE "Booking" ALTER COLUMN "status" SET DEFAULT 'UPCOMING';
COMMIT;

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_tutorId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_tutorProfileId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "endTime",
DROP COLUMN "startTime",
DROP COLUMN "totalPrice",
DROP COLUMN "updatedAt",
ALTER COLUMN "status" SET DEFAULT 'UPCOMING';

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "tutorProfileId",
ADD COLUMN     "tutorId" TEXT NOT NULL,
ALTER COLUMN "comment" SET NOT NULL;

-- AlterTable
ALTER TABLE "TutorProfile" DROP COLUMN "availability",
DROP COLUMN "createdAt",
DROP COLUMN "hourlyRate",
DROP COLUMN "subjects",
DROP COLUMN "updatedAt",
ADD COLUMN     "pricePerHr" INTEGER NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "bio" SET NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "status",
ADD COLUMN     "isBanned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password" TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" TEXT DEFAULT 'STUDENT';

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "UserStatus";

-- CreateTable
CREATE TABLE "Availability" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "TutorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `nameTc` on the `User` table. All the data in the column will be lost.
  - Added the required column `nameTcc` to the `User` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[User] DROP COLUMN [nameTc];
ALTER TABLE [dbo].[User] ADD [nameTcc] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

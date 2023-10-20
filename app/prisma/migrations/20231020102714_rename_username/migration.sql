/*
  Warnings:

  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username2]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username2` to the `User` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_username_key];

-- AlterTable
ALTER TABLE [dbo].[User] DROP COLUMN [username];
ALTER TABLE [dbo].[User] ADD [username2] NVARCHAR(1000) NOT NULL;

ALTER TABLE  [dbo].[User] ADD
MyColumn text NOT NULL CONSTRAINT DF_MyTable_MyColumn DEFAULT 'defaultValue'
ALTER TABLE dbo.MyTable
DROP CONSTRAINT DF_MyTable_MyColumn

-- CreateIndex
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_username2_key] UNIQUE NONCLUSTERED ([username2]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `UserSession` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[UserSession] ADD CONSTRAINT [UserSession_token_key] UNIQUE NONCLUSTERED ([token]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

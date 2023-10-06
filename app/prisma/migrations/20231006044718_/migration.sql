BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Profile] (
    [id] INT NOT NULL IDENTITY(1,1),
    [desc] NVARCHAR(1000),
    [profileID] INT NOT NULL,
    CONSTRAINT [Profile_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Profile_profileID_key] UNIQUE NONCLUSTERED ([profileID])
);

-- CreateTable
CREATE TABLE [dbo].[Machine] (
    [id] INT NOT NULL IDENTITY(1,1),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Machine_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [machineID] VARCHAR(255) NOT NULL,
    [content] NVARCHAR(1000),
    [published] BIT NOT NULL CONSTRAINT [Machine_published_df] DEFAULT 0,
    [authorId] INT NOT NULL,
    CONSTRAINT [Machine_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Machine_authorId_key] UNIQUE NONCLUSTERED ([authorId])
);

-- CreateTable
CREATE TABLE [dbo].[UserSession] (
    [userID] NVARCHAR(1000) NOT NULL,
    [token] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [UserSession_userID_key] UNIQUE NONCLUSTERED ([userID])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [userID] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [userRole] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [nameTcc] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_userID_key] UNIQUE NONCLUSTERED ([userID])
);

-- AddForeignKey
ALTER TABLE [dbo].[UserSession] ADD CONSTRAINT [UserSession_userID_fkey] FOREIGN KEY ([userID]) REFERENCES [dbo].[User]([userID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

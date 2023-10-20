BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Profile] (
    [profileID] NVARCHAR(1000) NOT NULL,
    [desc] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Profile_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [userID] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Profile_pkey] PRIMARY KEY CLUSTERED ([profileID]),
    CONSTRAINT [Profile_profileID_key] UNIQUE NONCLUSTERED ([profileID]),
    CONSTRAINT [Profile_userID_key] UNIQUE NONCLUSTERED ([userID])
);

-- CreateTable
CREATE TABLE [dbo].[Machine] (
    [machineID] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Machine_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [serverToken] NVARCHAR(1000) NOT NULL,
    [location] NVARCHAR(1000) NOT NULL,
    [ownerID] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    [config] VARCHAR(8000) NOT NULL,
    [remark] NVARCHAR(1000),
    CONSTRAINT [Machine_pkey] PRIMARY KEY CLUSTERED ([machineID]),
    CONSTRAINT [Machine_machineID_key] UNIQUE NONCLUSTERED ([machineID]),
    CONSTRAINT [Machine_ownerID_key] UNIQUE NONCLUSTERED ([ownerID])
);

-- CreateTable
CREATE TABLE [dbo].[MasterProduct] (
    [productID] NVARCHAR(1000) NOT NULL,
    [isActive] BIT NOT NULL CONSTRAINT [MasterProduct_isActive_df] DEFAULT 1,
    [suspend] BIT NOT NULL CONSTRAINT [MasterProduct_suspend_df] DEFAULT 0,
    [productName] NVARCHAR(1000),
    [productNameEn] NVARCHAR(1000),
    [desc] NVARCHAR(1000),
    [descEn] NVARCHAR(1000),
    [price] DECIMAL(32,16) NOT NULL,
    [unitPrice] DECIMAL(32,16) NOT NULL,
    [unit] NVARCHAR(1000),
    [currency] NVARCHAR(1000) NOT NULL,
    [remark] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [MasterProduct_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [MasterProduct_pkey] PRIMARY KEY CLUSTERED ([productID]),
    CONSTRAINT [MasterProduct_productID_key] UNIQUE NONCLUSTERED ([productID])
);

-- CreateTable
CREATE TABLE [dbo].[MachinePalletDetail] (
    [palletDetailID] NVARCHAR(1000) NOT NULL,
    [machineID] NVARCHAR(1000) NOT NULL,
    [palletID] INT NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [productID] NVARCHAR(1000) NOT NULL,
    [inventory] INT NOT NULL,
    [price] DECIMAL(32,16) NOT NULL,
    [weight] DECIMAL(32,16) NOT NULL,
    CONSTRAINT [MachinePalletDetail_pkey] PRIMARY KEY CLUSTERED ([palletDetailID]),
    CONSTRAINT [MachinePalletDetail_palletDetailID_key] UNIQUE NONCLUSTERED ([palletDetailID]),
    CONSTRAINT [MachinePalletDetail_machineID_key] UNIQUE NONCLUSTERED ([machineID]),
    CONSTRAINT [MachinePalletDetail_productID_key] UNIQUE NONCLUSTERED ([productID])
);

-- CreateTable
CREATE TABLE [dbo].[MachineProductSummary] (
    [summaryID] NVARCHAR(1000) NOT NULL,
    [machineID] NVARCHAR(1000) NOT NULL,
    [productID] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [MachineProductSummary_pkey] PRIMARY KEY CLUSTERED ([summaryID]),
    CONSTRAINT [MachineProductSummary_summaryID_key] UNIQUE NONCLUSTERED ([summaryID])
);

-- CreateTable
CREATE TABLE [dbo].[Transaction] (
    [transactionID] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Transaction_pkey] PRIMARY KEY CLUSTERED ([transactionID]),
    CONSTRAINT [Transaction_transactionID_key] UNIQUE NONCLUSTERED ([transactionID])
);

-- CreateTable
CREATE TABLE [dbo].[UserSession] (
    [userID] NVARCHAR(1000) NOT NULL,
    [token] NVARCHAR(1000) NOT NULL,
    [expiredDate] DATETIME2 NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [UserSession_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [UserSession_userID_key] UNIQUE NONCLUSTERED ([userID])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [userID] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [nameEn] NVARCHAR(1000) NOT NULL,
    [authenticated] BIT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [userRoleID] INT NOT NULL,
    [userTypeID] INT NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([userID]),
    CONSTRAINT [User_userID_key] UNIQUE NONCLUSTERED ([userID]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username])
);

-- CreateTable
CREATE TABLE [dbo].[UserType] (
    [userTypeID] INT NOT NULL IDENTITY(1,1),
    [userTypeName] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [UserType_pkey] PRIMARY KEY CLUSTERED ([userTypeID]),
    CONSTRAINT [UserType_userTypeID_key] UNIQUE NONCLUSTERED ([userTypeID])
);

-- CreateTable
CREATE TABLE [dbo].[UserRole] (
    [userRoleID] INT NOT NULL IDENTITY(1,1),
    [userRoleName] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [UserRole_pkey] PRIMARY KEY CLUSTERED ([userRoleID]),
    CONSTRAINT [UserRole_userRoleID_key] UNIQUE NONCLUSTERED ([userRoleID])
);

-- AddForeignKey
ALTER TABLE [dbo].[Profile] ADD CONSTRAINT [Profile_userID_fkey] FOREIGN KEY ([userID]) REFERENCES [dbo].[User]([userID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Machine] ADD CONSTRAINT [Machine_ownerID_fkey] FOREIGN KEY ([ownerID]) REFERENCES [dbo].[User]([userID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[MachinePalletDetail] ADD CONSTRAINT [MachinePalletDetail_machineID_fkey] FOREIGN KEY ([machineID]) REFERENCES [dbo].[Machine]([machineID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[MachinePalletDetail] ADD CONSTRAINT [MachinePalletDetail_productID_fkey] FOREIGN KEY ([productID]) REFERENCES [dbo].[MasterProduct]([productID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[MachineProductSummary] ADD CONSTRAINT [MachineProductSummary_machineID_fkey] FOREIGN KEY ([machineID]) REFERENCES [dbo].[Machine]([machineID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[MachineProductSummary] ADD CONSTRAINT [MachineProductSummary_productID_fkey] FOREIGN KEY ([productID]) REFERENCES [dbo].[MasterProduct]([productID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserSession] ADD CONSTRAINT [UserSession_userID_fkey] FOREIGN KEY ([userID]) REFERENCES [dbo].[User]([userID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_userRoleID_fkey] FOREIGN KEY ([userRoleID]) REFERENCES [dbo].[UserRole]([userRoleID]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_userTypeID_fkey] FOREIGN KEY ([userTypeID]) REFERENCES [dbo].[UserType]([userTypeID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH


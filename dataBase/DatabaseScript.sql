-- Create the database
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'YourProjectDb')
BEGIN
    CREATE DATABASE YourProjectDb;
END
GO

USE YourProjectDb;
GO

-- Create Tables
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Categories')
BEGIN
    CREATE TABLE Categories (
        Id INT PRIMARY KEY IDENTITY(1,1),
        Name NVARCHAR(100) NOT NULL,
        Description NVARCHAR(500) NULL
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Products')
BEGIN
    CREATE TABLE Products (
        Id INT PRIMARY KEY IDENTITY(1,1),
        Name NVARCHAR(200) NOT NULL,
        Description NVARCHAR(1000) NULL,
        Price DECIMAL(18,2) NOT NULL,
        StockQuantity INT NOT NULL,
        ImageUrl NVARCHAR(255) NULL,
        CategoryId INT FOREIGN KEY REFERENCES Categories(Id),
        CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        IsActive BIT NOT NULL DEFAULT 1
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
BEGIN
    CREATE TABLE Users (
        Id INT PRIMARY KEY IDENTITY(1,1),
        Username NVARCHAR(100) NOT NULL,
        Email NVARCHAR(150) NOT NULL,
        PasswordHash NVARCHAR(MAX) NOT NULL,
        FirstName NVARCHAR(100) NULL,
        LastName NVARCHAR(100) NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        IsActive BIT NOT NULL DEFAULT 1
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Orders')
BEGIN
    CREATE TABLE Orders (
        Id INT PRIMARY KEY IDENTITY(1,1),
        UserId INT FOREIGN KEY REFERENCES Users(Id),
        OrderDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
        TotalAmount DECIMAL(18,2) NOT NULL,
        Status NVARCHAR(20) NOT NULL DEFAULT 'Pending',
        ShippingAddress NVARCHAR(255) NULL,
        PaymentMethod NVARCHAR(100) NULL
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'OrderItems')
BEGIN
    CREATE TABLE OrderItems (
        Id INT PRIMARY KEY IDENTITY(1,1),
        OrderId INT FOREIGN KEY REFERENCES Orders(Id),
        ProductId INT FOREIGN KEY REFERENCES Products(Id),
        Quantity INT NOT NULL,
        UnitPrice DECIMAL(18,2) NOT NULL,
        Subtotal DECIMAL(18,2) NOT NULL
    );
END
GO

-- Seed data for Categories
IF NOT EXISTS (SELECT * FROM Categories)
BEGIN
    INSERT INTO Categories (Name, Description)
    VALUES
        ('Electronics', 'Electronic items'),
        ('Clothing', 'Clothing items'),
        ('Books', 'Books and publications');
END
GO

-- Seed data for Products
IF NOT EXISTS (SELECT * FROM Products)
BEGIN
    INSERT INTO Products (Name, Description, Price, StockQuantity, CategoryId, ImageUrl)
    VALUES
        ('Smartphone X', 'Latest smartphone with amazing features', 799.99, 50, 1, '/images/products/smartphone.jpg'),
        ('Laptop Pro', 'Professional laptop for all your needs', 1299.99, 25, 1, '/images/products/laptop.jpg'),
        ('T-shirt Basic', 'Comfortable cotton t-shirt', 19.99, 100, 2, '/images/products/tshirt.jpg'),
        ('Jeans Classic', 'Classic blue jeans', 49.99, 75, 2, '/images/products/jeans.jpg'),
        ('Programming Guide', 'Comprehensive programming guide', 29.99, 30, 3, '/images/products/book1.jpg'),
        ('Novel Collection', 'Best-selling novel collection', 39.99, 20, 3, '/images/products/book2.jpg');
END
GO

-- Seed data for Users
IF NOT EXISTS (SELECT * FROM Users)
BEGIN
    INSERT INTO Users (Username, Email, PasswordHash, FirstName, LastName)
    VALUES
        ('admin', 'admin@example.com', 'AQAAAAEAACcQAAAAEPLjH6yrZz0qAJPjvfddyMMSyF8K9Ak+SnzivOJO42OL9WUqS3aUCRLFEAQgxrnSpw==', 'System', 'Admin'),
        ('user1', 'user1@example.com', 'AQAAAAEAACcQAAAAEJDrTmcWdtP+1o2XlXKOOlCAPx+HUgfNzAl7cTPlmL+R0w51MjVf1ZWL/kSPEsvJzw==', 'John', 'Doe'),
        ('user2', 'user2@example.com', 'AQAAAAEAACcQAAAAEMd1GWSvgCkQlLSWQKn/KCHH//4Oqj+vnDq9q2OgnJr1JLJZURzzXRwYDjjnEkCnVQ==', 'Jane', 'Smith');
END
GO

-- Create indexes for better performance
CREATE INDEX IX_Products_CategoryId ON Products(CategoryId);
CREATE INDEX IX_Orders_UserId ON Orders(UserId);
CREATE INDEX IX_OrderItems_OrderId ON OrderItems(OrderId);
CREATE INDEX IX_OrderItems_ProductId ON OrderItems(ProductId);
GO

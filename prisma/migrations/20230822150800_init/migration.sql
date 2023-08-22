-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refresh_token" TEXT
);

-- CreateTable
CREATE TABLE "Monitor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "interval" INTEGER NOT NULL DEFAULT 600,
    "last_down" DATETIME,
    "down_since" DATETIME,
    "down" BOOLEAN NOT NULL DEFAULT false,
    "recipient" TEXT NOT NULL,
    "monitor_enabled" BOOLEAN NOT NULL DEFAULT true,
    "scheduled" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Monitor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "Monitor_name_idx" ON "Monitor"("name");

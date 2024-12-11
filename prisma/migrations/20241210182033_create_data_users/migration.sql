-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "socialName" TEXT,
    "fantasyName" TEXT,
    "document" TEXT NOT NULL,
    "whatsapp" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "orderVolume" TEXT NOT NULL,
    "modules" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_document_key" ON "Users"("document");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

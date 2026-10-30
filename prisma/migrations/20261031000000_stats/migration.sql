-- AlterTable
ALTER TABLE "Inquiry" ADD COLUMN     "visitId" TEXT;

-- CreateTable
CREATE TABLE "Visit" (
    "id" TEXT NOT NULL,
    "visitor" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pages" INTEGER NOT NULL DEFAULT 1,
    "landing" TEXT NOT NULL,
    "referrer" TEXT,
    "refUrl" TEXT,
    "grp" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "source" TEXT,
    "medium" TEXT,
    "campaign" TEXT,
    "keyword" TEXT,
    "device" TEXT NOT NULL,
    "os" TEXT,
    "browser" TEXT,
    "isNew" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hit" (
    "id" SERIAL NOT NULL,
    "visitId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "target" TEXT,
    "at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE INDEX "Visit_startedAt_idx" ON "Visit"("startedAt");

-- CreateIndex
CREATE INDEX "Visit_visitor_idx" ON "Visit"("visitor");

-- CreateIndex
CREATE INDEX "Hit_visitId_idx" ON "Hit"("visitId");

-- CreateIndex
CREATE INDEX "Hit_at_kind_idx" ON "Hit"("at", "kind");

-- CreateIndex
CREATE INDEX "Inquiry_visitId_idx" ON "Inquiry"("visitId");

-- AddForeignKey
ALTER TABLE "Hit" ADD CONSTRAINT "Hit_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit"("id") ON DELETE CASCADE ON UPDATE CASCADE;


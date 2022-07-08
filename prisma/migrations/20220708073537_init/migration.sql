-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "host" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_host_key" ON "Service"("host");

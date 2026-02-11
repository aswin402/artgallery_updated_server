-- CreateTable
CREATE TABLE "Art" (
    "id" SERIAL NOT NULL,
    "artname" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "Art_pkey" PRIMARY KEY ("id")
);

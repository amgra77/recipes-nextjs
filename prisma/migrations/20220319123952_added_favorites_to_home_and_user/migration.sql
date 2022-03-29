-- CreateTable
CREATE TABLE "UserFavorites" (
    "favoriteUserId" TEXT NOT NULL,
    "favoriteHomeId" TEXT NOT NULL,

    CONSTRAINT "UserFavorites_pkey" PRIMARY KEY ("favoriteUserId","favoriteHomeId")
);

-- AddForeignKey
ALTER TABLE "UserFavorites" ADD CONSTRAINT "UserFavorites_favoriteHomeId_fkey" FOREIGN KEY ("favoriteHomeId") REFERENCES "Home"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavorites" ADD CONSTRAINT "UserFavorites_favoriteUserId_fkey" FOREIGN KEY ("favoriteUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

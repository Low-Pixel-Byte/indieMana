-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_games" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "xboxUrl" TEXT,
    "googlePlayUrl" TEXT,
    "psnUrl" TEXT,
    "nintendoUrl" TEXT,
    "steamUrl" TEXT,
    "bannerUrl" TEXT NOT NULL,
    "discord" TEXT,
    "dateRelease" DATETIME NOT NULL,
    "trailerUrl" TEXT,
    "achivents" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_games" ("achivents", "bannerUrl", "createdAt", "dateRelease", "description", "discord", "googlePlayUrl", "id", "name", "nintendoUrl", "psnUrl", "steamUrl", "trailerUrl", "updatedAt", "xboxUrl") SELECT "achivents", "bannerUrl", "createdAt", "dateRelease", "description", "discord", "googlePlayUrl", "id", "name", "nintendoUrl", "psnUrl", "steamUrl", "trailerUrl", "updatedAt", "xboxUrl" FROM "games";
DROP TABLE "games";
ALTER TABLE "new_games" RENAME TO "games";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

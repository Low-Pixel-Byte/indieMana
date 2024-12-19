/*
  Warnings:

  - Added the required column `discord` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_games" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "xbox" TEXT NOT NULL,
    "psn" TEXT NOT NULL,
    "nintendo" TEXT NOT NULL,
    "steam" TEXT NOT NULL,
    "bannerUrl" TEXT NOT NULL,
    "discord" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_games" ("bannerUrl", "createdAt", "description", "id", "name", "nintendo", "psn", "steam", "updatedAt", "xbox") SELECT "bannerUrl", "createdAt", "description", "id", "name", "nintendo", "psn", "steam", "updatedAt", "xbox" FROM "games";
DROP TABLE "games";
ALTER TABLE "new_games" RENAME TO "games";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

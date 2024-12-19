/*
  Warnings:

  - Added the required column `bannerUrl` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nintendo` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `psn` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `steam` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xbox` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "_DeveloperToGame" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_DeveloperToGame_A_fkey" FOREIGN KEY ("A") REFERENCES "developers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DeveloperToGame_B_fkey" FOREIGN KEY ("B") REFERENCES "games" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_games" ("createdAt", "description", "id", "name", "updatedAt") SELECT "createdAt", "description", "id", "name", "updatedAt" FROM "games";
DROP TABLE "games";
ALTER TABLE "new_games" RENAME TO "games";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_DeveloperToGame_AB_unique" ON "_DeveloperToGame"("A", "B");

-- CreateIndex
CREATE INDEX "_DeveloperToGame_B_index" ON "_DeveloperToGame"("B");

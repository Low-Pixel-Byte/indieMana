/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to alter the column `A` on the `_CategoryToGame` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `B` on the `_CategoryToGame` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `B` on the `_DeveloperToGame` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `games` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nintendo` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `psn` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `steam` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `xbox` on the `games` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `games` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `achivents` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateRelease` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `googlePlayUrl` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nintendoUrl` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `psnUrl` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `steamUrl` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trailerUrl` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xboxUrl` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Category";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new__CategoryToGame" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CategoryToGame_A_fkey" FOREIGN KEY ("A") REFERENCES "categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CategoryToGame_B_fkey" FOREIGN KEY ("B") REFERENCES "games" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__CategoryToGame" ("A", "B") SELECT "A", "B" FROM "_CategoryToGame";
DROP TABLE "_CategoryToGame";
ALTER TABLE "new__CategoryToGame" RENAME TO "_CategoryToGame";
CREATE UNIQUE INDEX "_CategoryToGame_AB_unique" ON "_CategoryToGame"("A", "B");
CREATE INDEX "_CategoryToGame_B_index" ON "_CategoryToGame"("B");
CREATE TABLE "new__DeveloperToGame" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_DeveloperToGame_A_fkey" FOREIGN KEY ("A") REFERENCES "developers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DeveloperToGame_B_fkey" FOREIGN KEY ("B") REFERENCES "games" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__DeveloperToGame" ("A", "B") SELECT "A", "B" FROM "_DeveloperToGame";
DROP TABLE "_DeveloperToGame";
ALTER TABLE "new__DeveloperToGame" RENAME TO "_DeveloperToGame";
CREATE UNIQUE INDEX "_DeveloperToGame_AB_unique" ON "_DeveloperToGame"("A", "B");
CREATE INDEX "_DeveloperToGame_B_index" ON "_DeveloperToGame"("B");
CREATE TABLE "new_games" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "xboxUrl" TEXT NOT NULL,
    "googlePlayUrl" TEXT NOT NULL,
    "psnUrl" TEXT NOT NULL,
    "nintendoUrl" TEXT NOT NULL,
    "steamUrl" TEXT NOT NULL,
    "bannerUrl" TEXT NOT NULL,
    "discord" TEXT NOT NULL,
    "dateRelease" DATETIME NOT NULL,
    "trailerUrl" TEXT NOT NULL,
    "achivents" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_games" ("bannerUrl", "createdAt", "description", "discord", "id", "name", "updatedAt") SELECT "bannerUrl", "createdAt", "description", "discord", "id", "name", "updatedAt" FROM "games";
DROP TABLE "games";
ALTER TABLE "new_games" RENAME TO "games";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

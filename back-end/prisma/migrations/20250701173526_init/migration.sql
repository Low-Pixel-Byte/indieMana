-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_developers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "website" TEXT,
    "twitter" TEXT,
    "instagram" TEXT,
    "about" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_developers" ("about", "createdAt", "email", "id", "instagram", "name", "twitter", "updatedAt", "website") SELECT "about", "createdAt", "email", "id", "instagram", "name", "twitter", "updatedAt", "website" FROM "developers";
DROP TABLE "developers";
ALTER TABLE "new_developers" RENAME TO "developers";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

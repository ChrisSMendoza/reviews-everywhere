-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "stars" INTEGER,
    "top" TEXT NOT NULL,
    "left" TEXT NOT NULL,
    "url" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Review" ("id", "left", "stars", "text", "top", "url") SELECT "id", "left", "stars", "text", "top", "url" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

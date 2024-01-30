/*
  Warnings:

  - Added the required column `left` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `top` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "top" TEXT NOT NULL,
    "left" TEXT NOT NULL
);
INSERT INTO "new_Review" ("id", "text") SELECT "id", "text" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("app.db");

export const initDB = async () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS todos (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT,
      completed INTEGER,
      synced INTEGER,
      updatedAt INTEGER,
      retryCount INTEGER DEFAULT 0,
      lastError TEXT
    );
  `);
  try {
    await db.execAsync(`
      ALTER TABLE todos ADD COLUMN retryCount INTEGER DEFAULT 0;
    `);
  } catch {}

  try {
    await db.execAsync(`
      ALTER TABLE todos ADD COLUMN lastError TEXT;
    `);
  } catch {}
};

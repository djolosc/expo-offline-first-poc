import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("app.db");

export const initDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS todos (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT,
      completed INTEGER,
      synced INTEGER,
      updatedAt INTEGER
    );
  `);
};

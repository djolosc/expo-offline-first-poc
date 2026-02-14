import { db } from "@/src/db";
import { Todo } from "./todo.types";

export const insertTodo = (todo: Todo) => {
  db.runSync(`INSERT INTO todos VALUES (?, ?, ?, ?, ?, ?, ?)`, [
    todo.id,
    todo.title,
    todo.completed,
    todo.synced,
    todo.updatedAt,
    todo.retryCount,
    todo.lastError,
  ]);
};

export const getTodos = (): Todo[] => {
  return db.getAllSync(`SELECT * FROM todos ORDER BY updatedAt DESC`) as Todo[];
};

export const getPendingTodos = (): Todo[] => {
  return db.getAllSync(`SELECT * FROM todos WHERE synced = 0 AND retryCount < 5
ORDER BY updatedAt ASC;`) as Todo[];
};

export const markSynced = (id: string) => {
  db.runSync(
    `UPDATE todos SET synced = 1,
    retryCount = 0,
    lastError = NULL WHERE id = ?`,
    [id],
  );
};

export const incrementRetry = (id: string, error: string) => {
  db.runAsync(
    `UPDATE todos SET retryCount = retryCount + 1, lastError = ? WHERE id = ?`,
    [error, id],
  );
};

export const getFailedTodos = async () => {
  return db.getAllAsync(`
    SELECT *
    FROM todos
    WHERE synced = 0
    AND retryCount > 0
    ORDER BY retryCount DESC
  `) as Promise<Todo[]>;
};

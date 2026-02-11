import { db } from "@/src/db";
import { Todo } from "./todo.types";

export const insertTodo = (todo: any) => {
  db.runSync(`INSERT INTO todos VALUES (?, ?, ?, ?, ?)`, [
    todo.id,
    todo.title,
    todo.completed,
    todo.synced,
    todo.updatedAt,
  ]);
};

export const getTodos = () => {
  return db.getAllSync(`SELECT * FROM todos ORDER BY updatedAt DESC`);
};

export const getPendingTodos = (): Todo[] => {
  return db.getAllSync(`SELECT * FROM todos WHERE synced = 0`) as Todo[];
};

export const markSynced = (id: string) => {
  db.runSync(`UPDATE todos SET synced = 1 WHERE id = ?`, [id]);
};

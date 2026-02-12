import { uuid } from "../../utils/uuid";
import { insertTodo } from "./todo.repository";
import { syncTodos } from "./todo.sync";

export const createTodo = (title: string) => {
  const todo = {
    id: uuid(),
    title,
    completed: 0,
    synced: 0,
    updatedAt: Date.now(),
  };
  insertTodo(todo);
  syncTodos();
};

import { uuid } from "../../utils/uuid";
import { clearTodos, insertTodo } from "./todo.repository";
import { Todo } from "./todo.types";

export const createTodo = (title: string) => {
  const todo: Todo = {
    id: uuid(),
    title,
    completed: 0,
    synced: 0,
    updatedAt: Date.now(),
    retryCount: 0,
    lastError: null,
  };
  insertTodo(todo);
};

export const removeTodos = () => {
  clearTodos();
};

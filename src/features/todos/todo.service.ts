import { queryClient } from "@/src/store/queryClient";
import { uuid } from "../../utils/uuid";
import { clearTodos, insertTodo } from "./todo.repository";
import { syncTodos } from "./todo.sync";
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
  syncTodos();
};

export const removeTodos = () => {
  clearTodos();
  queryClient.invalidateQueries({ queryKey: ["todos"] });
  queryClient.invalidateQueries({ queryKey: ["failedTodos"] });
};

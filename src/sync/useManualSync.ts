import { syncTodos } from "../features/todos/todo.sync";

export const useManualSync = () => {
  const retry = async () => {
    console.log("here");
    await syncTodos();
  };
  return { retry };
};

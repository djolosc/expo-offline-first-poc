import { useEffect } from "react";
import { syncTodos } from "../features/todos/todo.sync";

export const useBackgroundSync = () => {
  useEffect(() => {
    const id = setInterval(() => {
      console.log("here");
      syncTodos();
    }, 15000);
    return () => clearInterval(id);
  });
};

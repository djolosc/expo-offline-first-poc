import { uploadTodo } from "@/src/api/client";
import { queryClient } from "@/src/store/queryClient";
import { getPendingTodos, markSynced } from "./todo.repository";

export const syncTodos = async () => {
  console.log("Sync started");
  const pending = getPendingTodos();
  console.log("Pending todos:", pending.length);

  for (const todo of pending) {
    try {
      await uploadTodo(todo);
      markSynced(todo.id);
      console.log("Synced:", todo.id);
    } catch (err) {
      console.error("Sync failed:", err);
    }
  }

  queryClient.invalidateQueries({ queryKey: ["todos"] });
};

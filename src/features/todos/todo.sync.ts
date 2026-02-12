import { uploadTodo } from "@/src/api/client";
import { queryClient } from "@/src/store/queryClient";
import { setSyncState } from "@/src/sync/syncState";
import NetInfo from "@react-native-community/netinfo";
import { getPendingTodos, markSynced } from "./todo.repository";

export const syncTodos = async () => {
  const net = await NetInfo.fetch();

  if (!net.isConnected) {
    setSyncState({ status: "offline" });
    return;
  }

  const pending = getPendingTodos();
  if (pending.length === 0) {
    setSyncState({ status: "idle", pending: 0, lastSync: Date.now() });
    return;
  }

  setSyncState({ status: "syncing", pending: pending.length });

  for (const todo of pending) {
    try {
      await uploadTodo(todo);
      markSynced(todo.id);
      console.log("Synced:", todo.id);
    } catch (err) {
      console.error("Sync failed:", err);
    }
  }

  setSyncState({
    status: "idle",
    pending: 0,
    lastSync: Date.now(),
  });

  queryClient.invalidateQueries({ queryKey: ["todos"] });
};

import { uploadTodo } from "@/src/api/client";
import { queryClient } from "@/src/store/queryClient";
import { setSyncState } from "@/src/sync/syncState";
import NetInfo from "@react-native-community/netinfo";
import { getPendingTodos, incrementRetry, markSynced } from "./todo.repository";

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

  let failed = 0;

  for (const todo of pending) {
    if (todo.retryCount > 5) {
      failed++;
      continue;
    }
    try {
      if (todo.retryCount > 0) {
        const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

        await delay(1000 * todo.retryCount);
      }

      await uploadTodo(todo);
      markSynced(todo.id);
      console.log("Synced:", todo.id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      incrementRetry(todo.id, errorMessage);
      console.error("Sync failed:", err);
    }
  }

  setSyncState({
    status: failed > 0 ? "error" : "idle",
    pending: 0,
    lastSync: Date.now(),
  });

  queryClient.invalidateQueries({ queryKey: ["todos"] });
};

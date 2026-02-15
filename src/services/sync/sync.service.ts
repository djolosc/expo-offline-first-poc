import {
  getAllUnsyncedCount,
  getFailedTodos,
  getPendingTodos,
  incrementRetry,
  markSynced,
} from "@/src/features/todos/todo.repository";
import { uploadTodo } from "@/src/services/api/client";
import { setSyncState } from "@/src/services/sync/syncState";
import { queryClient } from "@/src/store/queryClient";
import NetInfo from "@react-native-community/netinfo";

let syncing = false; // engine lock

export const syncTodos = async () => {
  if (syncing) {
    console.log("SYNC SKIPPED (already running)");
    return;
  }

  syncing = true;
  console.log("SYNC START");

  try {
    // --- 1. Check connection ---
    const net = await NetInfo.fetch();

    if (!net.isConnected) {
      setSyncState({ status: "offline" });
      return;
    }

    // --- 2. Load pending work from DB ---
    const pending = getPendingTodos();

    if (pending.length === 0) {
      const unsynced = getAllUnsyncedCount();
      const failed = await getFailedTodos();

      setSyncState({
        status: failed.length > 0 ? "error" : "idle",
        pending: unsynced,
        lastSync: Date.now(),
      });

      console.log("SYNC: nothing to upload");
      return;
    }

    // --- 3. Enter syncing state ---
    setSyncState({ status: "syncing", pending: pending.length });

    // --- 4. Process queue ---
    for (const todo of pending) {
      if (todo.retryCount > 5) continue;

      try {
        // exponential backoff delay
        if (todo.retryCount > 0) {
          const delay = (ms: number) =>
            new Promise((res) => setTimeout(res, ms));

          await delay(1000 * todo.retryCount);
        }

        await uploadTodo(todo);
        markSynced(todo.id);

        console.log("Synced:", todo.id);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        incrementRetry(todo.id, msg);

        console.error("Sync failed:", todo.id, msg);
      }
    }

    // --- 5. Recompute real system state ---
    const unsynced = getAllUnsyncedCount();
    const failed = await getFailedTodos();

    setSyncState({
      status: failed.length > 0 ? "error" : "idle",
      pending: unsynced,
      lastSync: Date.now(),
    });

    // --- 6. Refresh UI queries ---
    queryClient.invalidateQueries({ queryKey: ["todos"] });
    queryClient.invalidateQueries({ queryKey: ["failedTodos"] });

    console.log("SYNC END");
  } finally {
    syncing = false; // always unlock
  }
};

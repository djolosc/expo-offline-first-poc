import { syncTodos } from "./sync.service";
import { setSyncState } from "./syncState";

export const syncAll = async () => {
  setSyncState({ status: "syncing" });

  await Promise.all([syncTodos()]);

  setSyncState({ status: "idle" });
};

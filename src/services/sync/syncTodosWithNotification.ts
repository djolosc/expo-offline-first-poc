import { notifyNow } from "../notifications/notifications.service";
import { syncTodos } from "./sync.service";
import { getSyncState } from "./syncState";

export const syncTodosWithNotification = async () => {
  await syncTodos(); // run normal sync

  const state = getSyncState(); // current sync state

  if (state.status === "error") {
    notifyNow("Sync Failed", "Some todos could not be uploaded.");
  } else if (state.status === "idle") {
    notifyNow("Sync Complete", "All todos are up-to-date.");
  }
};

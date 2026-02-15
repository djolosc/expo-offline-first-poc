import { syncTodosWithNotification } from "./syncTodosWithNotification";

export const useManualSync = () => {
  const retry = async () => {
    await syncTodosWithNotification();
  };
  return { retry };
};

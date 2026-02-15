import { syncTodos } from "@/src/services/sync/sync.service";

export const useManualSync = () => {
  const retry = async () => {
    await syncTodos();
  };
  return { retry };
};

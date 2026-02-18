import { syncTodos } from "@/src/services/sync/sync.service";
import { useEffect } from "react";

export const useBackgroundSync = (isLoggedIn: boolean) => {
  useEffect(() => {
    if (!isLoggedIn) return;
    const id = setInterval(() => {
      syncTodos();
    }, 15000);
    return () => clearInterval(id);
  });
};

import { syncTodos } from "@/src/services/sync/sync.service";
import { useEffect } from "react";

export const useBackgroundSync = () => {
  useEffect(() => {
    const id = setInterval(() => {
      syncTodos();
    }, 15000);
    return () => clearInterval(id);
  });
};

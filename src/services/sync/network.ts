import { syncTodos } from "@/src/services/sync/sync.service";
import NetInfo from "@react-native-community/netinfo";
import { setSyncState } from "./syncState";

export const startNetworkListener = (onReconnect: () => void) => {
  return NetInfo.addEventListener((state) => {
    if (!state.isConnected) {
      setSyncState({ status: "offline" });
      return;
    }
    setSyncState({ status: "syncing" });
    onReconnect();
  });
};

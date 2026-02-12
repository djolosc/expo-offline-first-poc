import NetInfo from "@react-native-community/netinfo";
import { syncTodos } from "../features/todos/todo.sync";
import { setSyncState } from "./syncState";

export const startNetworkListener = () => {
  NetInfo.addEventListener((state) => {
    if (!state.isConnected) {
      setSyncState({ status: "offline" });
      return;
    }
    setSyncState({ status: "syncing" });
    syncTodos();
  });
};

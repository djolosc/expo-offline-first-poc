import NetInfo from "@react-native-community/netinfo";
import { syncTodos } from "../features/todos/todo.sync";

NetInfo.fetch().then((state) => console.log("Connected?", state.isConnected));

export const startNetworkListener = () => {
  NetInfo.addEventListener((state) => {
    if (state.isConnected) {
      syncTodos();
    }
  });
};

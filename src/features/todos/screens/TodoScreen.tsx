import FailedTodos from "@/src/features/todos/components/FailedTodos";
import {
  useAddTodo,
  useClearTodos,
  useTodos,
} from "@/src/features/todos/todo.hooks";
import { useSyncState } from "@/src/services/sync/useSyncState";
import { FC } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { useTodosRouter } from "../navigation/todosRouter";
import ScreenWrapper from "@/src/shared/components/ScreenWrapper";
import { useAuth } from "@/src/services/auth/AuthContext";

const TodoScreen: FC = () => {
  const { data = [] } = useTodos();
  const addTodo = useAddTodo();
  const sync = useSyncState();
  const { clearTodos } = useClearTodos();
  const router = useTodosRouter();
  const { logout } = useAuth();

  const lastSyncText = sync.lastSync
    ? new Date(sync.lastSync).toLocaleTimeString()
    : "never";

  return (
    <ScreenWrapper>
      <FailedTodos />

      <Text>Last sync: {lastSyncText}</Text>
      <Button title="Add Todo" onPress={() => addTodo("Offline task")} />

      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Text>
            {item.title} {item.synced ? "✅" : item.lastError ? "🔴" : "⏳"}
          </Text>
        )}
      />
      <Button title="Check Failed Todos" onPress={router.goToFailedTodos} />
      <Button title="Reset DB" onPress={clearTodos} />
      <Button title="Logout" onPress={logout} />
    </ScreenWrapper>
  );
};

export default TodoScreen;

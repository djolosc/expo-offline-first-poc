import FailedTodos from "@/src/features/todos/FailedTodos";
import {
  useAddTodo,
  useClearTodos,
  useTodos,
} from "@/src/features/todos/todo.hooks";
import { useManualSync } from "@/src/services/sync/useManualSync";
import { useSyncState } from "@/src/services/sync/useSyncState";
import { Button, FlatList, Text, View } from "react-native";

const TodoScreen = () => {
  const { data = [] } = useTodos();
  const addTodo = useAddTodo();
  const sync = useSyncState();
  const { retry } = useManualSync();
  const { clearTodos } = useClearTodos();

  const lastSyncText = sync.lastSync
    ? new Date(sync.lastSync).toLocaleTimeString()
    : "never";

  return (
    <View style={{ flex: 1, padding: 40 }}>
      <FailedTodos />

      <Text>Last sync: {lastSyncText}</Text>
      <Button title="Add Todo" onPress={() => addTodo("Offline task")} />
      <Button title="Retry sync" onPress={retry} />
      <Button title="Reset DB" onPress={clearTodos} />

      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Text>
            {item.title} {item.synced ? "✅" : item.lastError ? "🔴" : "⏳"}
          </Text>
        )}
      />
    </View>
  );
};

export default TodoScreen;

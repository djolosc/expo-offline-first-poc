import FailedTodos from "@/src/features/todos/FailedTodos";
import { removeTodos } from "@/src/features/todos/todo.service";
import { useBackgroundSync } from "@/src/sync/useBackgroundSync";
import { useManualSync } from "@/src/sync/useManualSync";
import { Button, FlatList, Text, View } from "react-native";
import { useAddTodo, useTodos } from "../src/features/todos/todo.hooks";
import { useSyncState } from "../src/sync/useSyncState";

const Home = () => {
  useBackgroundSync();

  const { data = [] } = useTodos();
  const addTodo = useAddTodo();
  const sync = useSyncState();
  const { retry } = useManualSync();

  const lastSyncText = sync.lastSync
    ? new Date(sync.lastSync).toLocaleTimeString()
    : "never";

  return (
    <View style={{ flex: 1, padding: 40 }}>
      <FailedTodos />

      <Text>Last sync: {lastSyncText}</Text>
      <Button title="Add Todo" onPress={() => addTodo("Offline task")} />
      <Button title="Retry sync" onPress={retry} />
      <Button title="Reset DB" onPress={removeTodos} />

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

export default Home;

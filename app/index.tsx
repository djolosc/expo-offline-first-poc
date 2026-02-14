import FailedTodos from "@/src/features/todos/FailedTodos";
import { Button, FlatList, Text, View } from "react-native";
import { useAddTodo, useTodos } from "../src/features/todos/todo.hooks";
import { useSyncState } from "../src/sync/useSyncState";

const Home = () => {
  const { data = [] } = useTodos();
  const addTodo = useAddTodo();
  const sync = useSyncState();

  const lastSyncText = sync.lastSync
    ? new Date(sync.lastSync).toLocaleTimeString()
    : "never";

  return (
    <View style={{ flex: 1, padding: 40 }}>
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
    </View>
  );
};

export default Home;

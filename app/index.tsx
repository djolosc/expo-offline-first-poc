import { Button, FlatList, Text, View } from "react-native";
import { useAddTodo, useTodos } from "../src/features/todos/todo.hooks";
import { useSyncState } from "../src/sync/useSyncState";

const Home = () => {
  const { data = [] } = useTodos();
  const addTodo = useAddTodo();
  const sync = useSyncState();

  return (
    <View style={{ flex: 1, padding: 40 }}>
      <Text>
        {sync.status === "offline" && "🔴 Offline"}
        {sync.status === "syncing" && `🟡 Syncing ${sync.pending}…`}
        {sync.status === "idle" && "🟢 All synced ✓"}
      </Text>
      <Button title="Add Todo" onPress={() => addTodo("Offline task")} />

      <FlatList
        data={data}
        keyExtractor={(i: any) => i.id}
        renderItem={({ item }: any) => (
          <Text>
            {item.title} {item.synced ? "✅" : "⏳"}
          </Text>
        )}
      />
    </View>
  );
};

export default Home;

import { syncTodos } from "@/src/features/todos/todo.sync";
import { Button, FlatList, Text, View } from "react-native";
import { useAddTodo, useTodos } from "../src/features/todos/todo.hooks";

const Home = () => {
  const { data = [] } = useTodos();
  const addTodo = useAddTodo();

  return (
    <View style={{ flex: 1, padding: 40 }}>
      <Button title="Add Todo" onPress={() => addTodo("Offline task")} />
      <Button title="Force Sync" onPress={syncTodos} />

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

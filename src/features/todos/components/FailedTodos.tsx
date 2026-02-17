import { Text, View } from "react-native";
import { useFailedTodos } from "../todo.hooks";

const FailedTodos = () => {
  const { data, isLoading } = useFailedTodos();

  if (isLoading) return <Text>Loading failed queue…</Text>;

  if (!data?.length) return <Text>✅ No failed todos</Text>;

  return (
    <View>
      <Text>⚠️ Failed uploads:</Text>

      {data.map((todo) => (
        <View key={todo.id} style={{ marginBottom: 8 }}>
          <Text>{todo.title}</Text>
          <Text>Retries: {todo.retryCount}</Text>
          <Text>Error: {todo.lastError}</Text>
        </View>
      ))}
    </View>
  );
};

export default FailedTodos;

import { FC } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useFailedTodos } from "../todo.hooks";
import { useManualSync } from "@/src/services/sync/useManualSync";
import { syncTodos } from "@/src/services/sync/sync.service";
import ScreenWrapper from "@/src/shared/components/ScreenWrapper";

const FailedTodosScreen: FC = () => {
  const { data: failedTodos = [] } = useFailedTodos();
  const { retry } = useManualSync();

  return (
    <ScreenWrapper>
      <Text style={styles.title}>Failed Todos</Text>
      <FlatList
        data={failedTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text>{item.title}</Text>
            <Button title="Retry" onPress={() => syncTodos()} />
          </View>
        )}
        ListEmptyComponent={<Text>No failed todos!</Text>}
      />
      {failedTodos.length > 0 && <Button title="Retry All" onPress={retry} />}
    </ScreenWrapper>
  );
};

export default FailedTodosScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
});

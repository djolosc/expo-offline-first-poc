import { Stack } from "expo-router";

export default function TodosLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Todos" }} />
      <Stack.Screen name="failed" options={{ title: "Failed" }} />
    </Stack>
  );
}

import { Stack } from 'expo-router';

export default function TodosLayout() {
  return (
    <Stack 
     screenOptions={{
        headerStyle: { backgroundColor: "#6200EE" },
        headerTintColor: "#fff",
        contentStyle: { backgroundColor: "#f9f9f9" },
      }}>
      {/* <Stack.Screen name="index" options={{ title: 'Todos' }} />
      <Stack.Screen name="failed" options={{ title: 'Failed' }} /> */}
    </Stack>
  );
}
import { Stack } from "expo-router";
import { AppRoot } from "@/src/AppRoot";

export default function Layout() {
  return (
    <AppRoot>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "#fff" },
          headerShown: false,
        }}
      />
    </AppRoot>
  );
}

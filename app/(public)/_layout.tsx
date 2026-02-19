import { Stack } from "expo-router";
import { AppRoot } from "@/src/AppRoot";
import { PublicGate } from "@/src/services/auth/PublicGate";

export default function Layout() {
  return (
    <PublicGate>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "#fff" },
          headerShown: false,
        }}
      />
    </PublicGate>
  );
}

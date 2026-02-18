import { AuthGate } from "@/src/services/auth/AuthGate";
import { Stack } from "expo-router";

export default function TodosLayout() {
  return (
    <AuthGate>
      <Stack />
    </AuthGate>
  );
}

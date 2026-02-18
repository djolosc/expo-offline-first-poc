import { initDB } from "@/src/services/storage/dbService";
import { startNetworkListener } from "@/src/services/sync/network";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./store/queryClient";
import { useSetupNotifications } from "@/src/services/notifications/useSetupNotifications";
import { useBackgroundSync } from "@/src/services/sync/useBackgroundSync";
import { View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { AuthProvider } from "@/src/services/auth/AuthContext";

export const AppRoot = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false);

  useSetupNotifications();
  useBackgroundSync();

  useEffect(() => {
    const bootstrap = async () => {
      await initDB(); // ensure DB ready
      startNetworkListener(); // start once
      setReady(true);
    };

    bootstrap();
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthProvider>
  );
};

import { initDB } from "@/src/services/storage/dbService";
import { startNetworkListener } from "@/src/services/sync/network";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./store/queryClient";
import { useSetupNotifications } from "@/src/services/notifications/useSetupNotifications";
import { useBackgroundSync } from "@/src/services/sync/useBackgroundSync";
import { FC, useEffect } from "react";
import { View } from "react-native";
import { AuthProvider, useAuth } from "@/src/services/auth/AuthContext";

const AppContent: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuth();

  useSetupNotifications();
  useBackgroundSync(isLoggedIn);

  useEffect(() => {
    const bootstrap = async () => {
      if (!isLoggedIn) return;
      await initDB(); // ensure DB ready
      startNetworkListener(); // start once
    };

    bootstrap();
  }, []);

  return <>{children}</>;
};

export const AppRoot = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <AppContent>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </AppContent>
    </AuthProvider>
  );
};

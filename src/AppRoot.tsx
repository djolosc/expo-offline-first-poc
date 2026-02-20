import { initDB } from "@/src/services/storage/dbService";
import { startNetworkListener } from "@/src/services/sync/network";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./store/queryClient";
import { useSetupNotifications } from "@/src/services/notifications/useSetupNotifications";
import { useBackgroundSync } from "@/src/services/sync/useBackgroundSync";
import { FC, useEffect, useRef } from "react";
import { AuthProvider, useAuth } from "@/src/services/auth/AuthContext";
import { syncAll } from "./services/sync/syncOrchestrator";

const AppContent: FC<{ children: React.ReactNode }> = ({ children }) => {
  const hasStarted = useRef(false);
  const { isLoggedIn } = useAuth();

  useSetupNotifications();
  useBackgroundSync(isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn || hasStarted.current) return;

    hasStarted.current = true;

    let unsubscribe: (() => void) | undefined;

    const bootstrap = async () => {
      await initDB();
      unsubscribe = startNetworkListener(syncAll);
    };

    bootstrap();
    return () => {
      unsubscribe?.();
    };
  }, [isLoggedIn]);
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

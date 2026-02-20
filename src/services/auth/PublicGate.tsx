import { useRouter } from "expo-router";
import { useAuth } from "@/src/services/auth/AuthContext";
import { ReactNode, useEffect } from "react";

export const PublicGate = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/todos/todo"); // redirect to private route
    } else {
      router.replace("/(public)"); // ensure on login if not authenticated
    }
  }, [isLoggedIn, router]);

  return <>{children}</>;
};

import { ActivityIndicator, View } from "react-native";
import { useAuth } from "./AuthContext";
import { Redirect } from "expo-router";

export const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!token) {
    return <Redirect href="/(public)" />;
  }

  return <>{children}</>;
};

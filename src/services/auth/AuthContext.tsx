import { createContext, useContext, useEffect, useState } from "react";
import { getStoredToken, login, logout } from "./auth.service";

type AuthContextType = {
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const boot = async () => {
      const storedToken = await getStoredToken();
      setToken(storedToken);
      setLoading(false);
    };
    boot();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const t = await login(email, password);
    setToken(t);
  };

  const handleLogout = async () => {
    await logout();
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, loading, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

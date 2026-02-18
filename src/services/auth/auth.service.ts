import { loginRequest } from "./auth.client";
import { clearToken, loadToken, saveToken } from "./auth.repository";

export const login = async (email: string, password: string) => {
  const { token } = await loginRequest(email, password);
  await saveToken(token);
  return token;
};

export const logout = async () => {
  await clearToken();
};

export const getStoredToken = async () => {
  return await loadToken();
};

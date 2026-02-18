import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "session";

export const saveToken = async (token: string) => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

export const loadToken = async () => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

export const clearToken = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};

import * as Crypto from "expo-crypto";

export const uuid = () => {
  return Crypto.randomUUID();
};

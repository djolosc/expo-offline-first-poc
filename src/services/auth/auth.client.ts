type LoginResponse = {
  token: string;
};

export const loginRequest = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  await new Promise((r) => setTimeout(r, 800)); // fake network delay

  if (email === "demo@demo.com" && password === "1234") {
    return { token: "mock-jwt-token-123" };
  }

  throw new Error("Invalid credentials");
};

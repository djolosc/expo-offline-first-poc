import { useRouter } from "expo-router";
import { TODOS } from "./routes";

export const useTodosRouter = () => {
  const router = useRouter();

  return {
    goToFailedTodos: () => router.push(TODOS.ROUTE.FAILED),
    goBack: () => router.back(),
    goHome: () => router.push(TODOS.ROUTE.MAIN),
  };
};

import { useTodosRouter } from "./todosRouter";

export const startTodosFeature = () => {
  const router = useTodosRouter();

  // optional: prefetch or initialize state
  // e.g., queryClient.prefetchQuery(['todos'], fetchTodos)

  router.goHome();
};

import TodoScreen from "@/src/features/todos/TodoScreen";
import { useSetupNotifications } from "@/src/services/notifications/useSetupNotifications";
import { useBackgroundSync } from "@/src/services/sync/useBackgroundSync";

const Home = () => {
  return <TodoScreen />;
};

export default Home;

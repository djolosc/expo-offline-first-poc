import { View, Text, Button } from "react-native";
import { startTodosFeature } from "@/src/features/todos";

const Home = () => {
  return (
    <View>
      <Text>Welcome</Text>
      <Button title="Go to Todos" onPress={startTodosFeature} />
    </View>
  );
};

export default Home;

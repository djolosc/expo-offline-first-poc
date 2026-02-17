import { View, Text, Button } from "react-native";
import { startTodosFeature } from "@/src/features/todos";
import ScreenWrapper from "@/src/shared/components/ScreenWrapper";

const Home = () => {
  return (
    <ScreenWrapper>
      <View>
        <Text>Welcome</Text>
        <Button title="Go to Todos" onPress={startTodosFeature} />
      </View>
    </ScreenWrapper>
  );
};

export default Home;

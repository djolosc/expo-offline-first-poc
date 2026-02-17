import { ReactNode } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Platform,
} from "react-native";

interface ScreenWrapperProps {
  children: ReactNode;
  scrollable?: boolean;
  style?: object;
}

const ScreenWrapper = ({
  children,
  scrollable = false,
  style = {},
}: ScreenWrapperProps) => {
  if (scrollable) {
    return (
      <SafeAreaView style={[styles.container, style]}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, style]}>
      <View style={[styles.inner]}>{children}</View>
    </SafeAreaView>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 24 : 0,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

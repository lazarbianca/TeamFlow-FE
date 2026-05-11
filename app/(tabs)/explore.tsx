import { Image, Platform, ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function TabTwoScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>This is the explore tab.</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you&apos;re ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  titleContainer: {
    alignItems: "center",
    gap: 8,
    marginVertical: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
  },
});

import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <ThemedText type="title" style={styles.headerText}>
          Explore
        </ThemedText>
      }>
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle">Explore</ThemedText>
        <ThemedText>This is the explore tab (moved under /(app)/(tabs)).</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    position: 'absolute',
    bottom: 12,
    left: 16,
  },
  container: {
    flex: 1,
    gap: 8,
    padding: 16,
  },
});


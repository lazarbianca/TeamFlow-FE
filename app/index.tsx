import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

const PURPLE = '#4B1363';

export default function LandingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.brandBlock}>
          <View style={styles.logoRow}>
            <View style={styles.logoBox}>
              <Text style={styles.logoCheck}>✓</Text>
            </View>
            <Text style={styles.brandName}>TeamFlow</Text>
          </View>

          <Text style={styles.tagline}>Collaboration made easy.</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.buttonBase, styles.primaryButton]}
            onPress={() => router.push('/signup')}
          >
            <Text style={[styles.buttonText, styles.primaryText]}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.buttonBase, styles.secondaryButton]}
            onPress={() => router.push('/login')}
          >
            <Text style={[styles.buttonText, styles.secondaryText]}>I already have an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  brandBlock: {
    alignItems: 'center',
    marginBottom: 130,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  logoBox: {
    width: 38,
    height: 38,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCheck: {
    fontSize: 22,
    lineHeight: 22,
    color: '#111',
    fontWeight: '700',
  },

  brandName: {
    fontSize: 36,
    fontWeight: '700',
    color: PURPLE,
  },
  tagline: {
    marginTop: 10,
    fontSize: 15,
    color: '#6B6B6B',
  },

  actions: {
    width: '100%',
    alignItems: 'center',
    gap: 14,
  },
  buttonBase: {
    width: 260,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: PURPLE,
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#222',
  },
  secondaryText: {
    color: PURPLE,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
  },
});


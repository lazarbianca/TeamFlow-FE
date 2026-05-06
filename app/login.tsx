import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

const PURPLE = '#4B1363';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && password.length > 0;
  }, [email, password]);

  const onLogin = () => {
    // TODO: Replace with real API call.
    // For now, accept any credentials.
    router.replace('/(app)/(tabs)/explore');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.brandRow}>
          <View style={styles.logoBox}>
            <Text style={styles.logoCheck}>✓</Text>
          </View>
          <Text style={styles.brandName}>TeamFlow</Text>
        </View>

        <Text style={styles.title}>Login</Text>

        <View style={styles.card}>
          <View style={styles.fieldBlock}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Value"
              placeholderTextColor="#B5B5B5"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />
          </View>

          <View style={styles.fieldBlock}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Value"
              placeholderTextColor="#B5B5B5"
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              returnKeyType="done"
            />
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.buttonBase, styles.primaryButton, !canSubmit && styles.buttonDisabled]}
          onPress={onLogin}
          disabled={!canSubmit}
        >
          <Text style={[styles.buttonText, styles.primaryText]}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.buttonBase, styles.secondaryButton]}
          onPress={() => router.replace('/')}
        >
          <Text style={[styles.buttonText, styles.secondaryText]}>Back</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    justifyContent: 'center',
  },
  title: {
    color: PURPLE,
    fontSize: 44,
    fontWeight: '700',
    textAlign: 'left',
    marginBottom: 28,
  },

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    alignSelf: 'center',
    marginBottom: 28,
  },
  logoBox: {
    width: 34,
    height: 34,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCheck: {
    fontSize: 20,
    lineHeight: 20,
    color: '#111',
    fontWeight: '700',
  },
  brandName: {
    fontSize: 32,
    fontWeight: '700',
    color: PURPLE,
  },
  card: {
    borderWidth: 1,
    borderColor: '#D2D2D2',
    borderRadius: 14,
    padding: 18,
  },

  fieldBlock: {
    marginBottom: 18,
  },
  label: {
    fontSize: 18,
    color: '#222',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D2D2D2',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 16,
    fontSize: 18,
    color: '#222',
  },

  buttonBase: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  primaryButton: { backgroundColor: PURPLE },
  buttonDisabled: { opacity: 0.55 },
  primaryText: { color: '#fff' },
  secondaryButton: { backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#222' },
  secondaryText: { color: PURPLE },
  buttonText: { fontSize: 18, fontWeight: '600' },
});




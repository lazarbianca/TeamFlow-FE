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

type Role = 'student' | 'professor';

function isValidEmail(email: string) {
  // simple, readable validation (good enough for client-side UX)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function SignupScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('student');

  const canSubmit = useMemo(() => {
    return !!fullName.trim() && isValidEmail(email) && password.length >= 6;
  }, [email, fullName, password]);

  const onRegister = () => {
    // TODO: Replace with real API call.
    // For now, simulate a successful registration by entering the authed app section.
    router.replace('/workspace');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.title}>Create Account</Text>

        <View style={styles.card}>
          <View style={styles.fieldBlock}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Value"
              placeholderTextColor="#B5B5B5"
              style={styles.input}
              autoCapitalize="words"
              returnKeyType="next"
            />
          </View>

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

          <View style={styles.roleRow}>
            <RoleOption label="Student" selected={role === 'student'} onPress={() => setRole('student')} />
            <RoleOption
              label="Professor"
              selected={role === 'professor'}
              onPress={() => setRole('professor')}
            />
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.buttonBase, styles.primaryButton, !canSubmit && styles.buttonDisabled]}
          onPress={onRegister}
          disabled={!canSubmit}
        >
          <Text style={[styles.buttonText, styles.primaryText]}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.buttonBase, styles.secondaryButton]}
          onPress={() => router.push('/login')}
        >
          <Text style={[styles.buttonText, styles.secondaryText]}>I already have an account</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function RoleOption({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.roleOption} onPress={onPress}>
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected ? <View style={styles.radioInner} /> : null}
      </View>
      <Text style={styles.roleLabel}>{label}</Text>
    </TouchableOpacity>
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
    fontSize: 54,
    fontWeight: '700',
    marginBottom: 28,
  },

  card: {
    borderWidth: 1,
    borderColor: '#D2D2D2',
    borderRadius: 14,
    padding: 18,
    marginBottom: 26,
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

  roleRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 8,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  roleLabel: {
    fontSize: 20,
    color: '#222',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#333',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#333',
  },

  buttonBase: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  primaryButton: {
    backgroundColor: PURPLE,
  },
  buttonDisabled: {
    opacity: 0.55,
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
    fontSize: 18,
    fontWeight: '600',
  },
});



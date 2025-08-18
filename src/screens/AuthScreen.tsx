import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/theme';
import { useStore } from '../state/store';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useStore((s) => s.login);
  const signup = useStore((s) => s.signup);
  const t = useTheme();
  const S = styles(t);

  return (
    <View style={S.container}>
      <TextInput style={S.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={S.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Pressable style={S.btn} onPress={() => login(email, password)}>
        <Text style={S.btnText}>Sign In</Text>
      </Pressable>
      <Pressable style={[S.btn, S.outline]} onPress={() => signup(email, password)}>
        <Text style={[S.btnText, { color: t.color.primary }]}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

function styles(t: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: t.spacing(2),
      justifyContent: 'center',
      backgroundColor: t.color.bg,
    },
    input: {
      borderWidth: 1,
      borderColor: t.color.border,
      borderRadius: t.radius.sm,
      padding: t.spacing(1),
      marginBottom: t.spacing(1),
      color: t.color.text,
    },
    btn: {
      backgroundColor: t.color.primary,
      padding: t.spacing(1),
      borderRadius: t.radius.md,
      marginTop: t.spacing(1),
      alignItems: 'center',
    },
    btnText: {
      color: t.color.surface,
      fontSize: t.typography.body.size,
      fontWeight: '600',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: t.color.primary,
    },
  });
}

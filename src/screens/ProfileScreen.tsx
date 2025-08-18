import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useStore } from '../state/store';
import { useTheme } from '../theme/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'ProfileTab'>;

export default function ProfileScreen({ navigation }: Props) {
  const user = useStore((s) => s.user);
  const logout = useStore((s) => s.logout);
  const t = useTheme();
  const S = styles(t);

  if (!user) {
    return (
      <View style={S.container}>
        <Text style={S.text}>Not signed in</Text>
        <Pressable style={S.btn} onPress={() => navigation.navigate('Auth')}>
          <Text style={S.btnText}>Sign In</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={S.container}>
      <Text style={S.text}>{user.email}</Text>
      <Pressable
        style={S.btn}
        onPress={() => {
          logout();
          navigation.navigate('Auth');
        }}
      >
        <Text style={S.btnText}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

function styles(t: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: t.color.bg },
    text: { color: t.color.text, fontSize: t.typography.body.size, marginBottom: t.spacing(1) },
    btn: { backgroundColor: t.color.primary, padding: t.spacing(1), borderRadius: t.radius.md },
    btnText: { color: t.color.surface, fontSize: t.typography.body.size, fontWeight: '600' },
  });
}

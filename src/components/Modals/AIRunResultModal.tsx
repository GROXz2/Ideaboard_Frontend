import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'AIRunResultModal'>;

export default function AIRunResultModal({ route, navigation }: Props) {
  const { result } = route.params as { result: { tokens_in: number; tokens_out: number; usd_cost: number } };
  const t = useTheme();
  const S = styles(t);
  return (
    <View style={S.container}>
      <Text style={S.title}>AI Run</Text>
      <Text style={S.text}>Tokens in: {result.tokens_in}</Text>
      <Text style={S.text}>Tokens out: {result.tokens_out}</Text>
      <Text style={S.text}>Cost: ${result.usd_cost.toFixed(4)}</Text>
      <Pressable style={S.btn} onPress={() => navigation.goBack()}>
        <Text style={S.btnText}>Close</Text>
      </Pressable>
    </View>
  );
}

function styles(t: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: t.spacing(2),
      backgroundColor: t.color.bg,
      justifyContent: 'center',
    },
    title: {
      fontSize: t.typography.h2.size,
      lineHeight: t.typography.h2.lh,
      color: t.color.text,
      fontWeight: '600',
      marginBottom: t.spacing(2),
    },
    text: {
      fontSize: t.typography.body.size,
      color: t.color.text,
      marginBottom: t.spacing(1),
    },
    btn: {
      marginTop: t.spacing(2),
      alignSelf: 'center',
      backgroundColor: t.color.primary,
      paddingHorizontal: t.spacing(2),
      paddingVertical: t.spacing(1),
      borderRadius: t.radius.md,
    },
    btnText: {
      color: t.color.surface,
      fontSize: t.typography.body.size,
      fontWeight: '600',
    },
  });
}

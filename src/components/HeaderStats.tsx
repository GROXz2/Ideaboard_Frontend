import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/theme';
import { useStore } from '../state/store';

export default function HeaderStats() {
  const lastRun = useStore((s) => s.lastRun);
  const t = useTheme();
  const S = styles(t);

  return (
    <View style={S.root}>
      <Text style={S.text}>Tokens: {lastRun ? `${lastRun.tokens_in}/${lastRun.tokens_out}` : '0/0'}</Text>
      <Text style={S.text}>$ {lastRun ? lastRun.usd_cost.toFixed(4) : '0.0000'}</Text>
    </View>
  );
}

function styles(t: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    root: {
      flexDirection: 'row',
      gap: t.spacing(1),
      paddingHorizontal: t.spacing(1),
    },
    text: {
      color: t.color.text,
      fontSize: t.typography.caption.size,
    },
  });
}

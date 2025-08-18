import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/theme';

export default function EmptyState({ message }: { message: string }) {
  const t = useTheme();
  const S = styles(t);
  return (
    <View style={S.root}>
      <Text style={S.text}>{message}</Text>
    </View>
  );
}

function styles(t: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    root: {
      padding: t.spacing(2),
      alignItems: 'center',
    },
    text: {
      color: t.color.textDim,
      fontSize: t.typography.body.size,
    },
  });
}

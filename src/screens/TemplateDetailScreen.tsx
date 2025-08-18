import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useStore } from '../state/store';
import { useTheme } from '../theme/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { shadowStyle } from '../theme/theme';

type Props = NativeStackScreenProps<any, 'TemplateDetail'>;

export default function TemplateDetailScreen({ route }: Props) {
  const { id } = route.params as { id: string };
  const template = useStore((s) => s.detail);
  const loadTemplate = useStore((s) => s.loadTemplate);
  const instantiate = useStore((s) => s.instantiate);
  const purchase = useStore((s) => s.purchase);
  const activeBoardId = useStore((s) => s.activeBoardId);
  const t = useTheme();
  const S = styles(t);

  useEffect(() => {
    loadTemplate(id);
  }, [id]);

  if (!template) return null;

  return (
    <View style={S.container}>
      <Text style={S.title}>{template.title}</Text>
      <Text style={S.desc}>{template.description}</Text>
      <View style={S.row}>
        <Pressable style={S.btn} onPress={() => instantiate(id, activeBoardId!)}>
          <Text style={S.btnText}>Instantiate</Text>
        </Pressable>
        <Pressable style={[S.btn, S.secondary]} onPress={() => purchase(id)}>
          <Text style={S.secondaryText}>Buy</Text>
        </Pressable>
      </View>
    </View>
  );
}

function styles(t: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: t.spacing(2),
      backgroundColor: t.color.bg,
    },
    title: {
      fontSize: t.typography.h2.size,
      lineHeight: t.typography.h2.lh,
      color: t.color.text,
      fontWeight: '600',
      marginBottom: t.spacing(1),
    },
    desc: {
      fontSize: t.typography.body.size,
      lineHeight: t.typography.body.lh,
      color: t.color.textDim,
      marginBottom: t.spacing(2),
    },
    row: {
      flexDirection: 'row',
      gap: t.spacing(1),
    },
    btn: {
      flex: 1,
      backgroundColor: t.color.primary,
      padding: t.spacing(1),
      borderRadius: t.radius.md,
      alignItems: 'center',
      ...shadowStyle('sm'),
    },
    btnText: {
      color: t.color.surface,
      fontSize: t.typography.body.size,
      fontWeight: '600',
    },
    secondary: {
      backgroundColor: t.color.bg,
      borderWidth: 1,
      borderColor: t.color.primary,
    },
    secondaryText: {
      color: t.color.primary,
      fontSize: t.typography.body.size,
      fontWeight: '600',
    },
  });
}

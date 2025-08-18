import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useStore } from '../state/store';
import { useTheme } from '../theme/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'TasksPanel'>;

export default function TasksPanelScreen({}: Props) {
  const tasks = useStore((s) => s.tasks);
  const loadTasks = useStore((s) => s.loadTasks);
  const activeBoardId = useStore((s) => s.activeBoardId);
  const t = useTheme();
  const S = styles(t);

  useEffect(() => {
    if (activeBoardId) loadTasks(activeBoardId);
  }, [activeBoardId]);

  return (
    <View style={S.container}>
      <FlatList data={tasks} keyExtractor={(i) => i.id} renderItem={({ item }) => <Text style={S.text}>{item.title}</Text>} />
    </View>
  );
}

function styles(t: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: t.color.bg, padding: t.spacing(2) },
    text: { color: t.color.text, fontSize: t.typography.body.size, marginBottom: t.spacing(1) },
  });
}

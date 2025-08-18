import React, { useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useStore } from '../state/store';
import { useTheme } from '../theme/theme';

export default function AIThreadsScreen() {
  const threads = useStore((s) => s.threads);
  const loadThreads = useStore((s) => s.loadThreads);
  const activeBoardId = useStore((s) => s.activeBoardId);
  const runAI = useStore((s) => s.runAI);
  const t = useTheme();
  const S = styles(t);

  useEffect(() => {
    if (activeBoardId) loadThreads(activeBoardId);
  }, [activeBoardId]);

  return (
    <View style={S.container}>
      <FlatList
        data={threads}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={S.item}>
            <Text style={S.text}>{item.lastMessage}</Text>
          </View>
        )}
      />
      <Pressable
        style={S.btn}
        onPress={async () => {
          if (activeBoardId) {
            await runAI({ boardId: activeBoardId, model: 'gpt-4', include: [] });
            loadThreads(activeBoardId);
          }
        }}
      >
        <Text style={S.btnText}>Run Again</Text>
      </Pressable>
    </View>
  );
}

function styles(t: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: t.color.bg },
    item: { padding: t.spacing(1), borderBottomWidth: 1, borderBottomColor: t.color.border },
    text: { color: t.color.text },
    btn: {
      margin: t.spacing(2),
      backgroundColor: t.color.primary,
      padding: t.spacing(1),
      borderRadius: t.radius.md,
      alignItems: 'center',
    },
    btnText: { color: t.color.surface, fontSize: t.typography.body.size, fontWeight: '600' },
  });
}

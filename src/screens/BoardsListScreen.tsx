import React, { useEffect } from 'react';
import { shadowStyle } from "../theme/theme";
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useStore } from '../state/store';
import { useTheme } from '../theme/theme';
import EmptyState from '../components/EmptyState';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'BoardsList'>;

export default function BoardsListScreen({ navigation }: Props) {
  const boards = useStore((s) => s.boards);
  const loadBoards = useStore((s) => s.loadBoards);
  const createBoard = useStore((s) => s.createBoard);
  const openBoard = useStore((s) => s.openBoard);
  const t = useTheme();
  const S = styles(t);

  useEffect(() => {
    loadBoards();
  }, []);

  const renderItem = ({ item }: any) => (
    <Pressable
      style={S.item}
      onPress={async () => {
        await openBoard(item.id);
        navigation.navigate('BoardCanvas');
      }}
    >
      <Text style={S.itemText}>{item.title}</Text>
    </Pressable>
  );

  return (
    <View style={S.container}>
      {boards.length === 0 ? (
        <EmptyState message="No boards yet" />
      ) : (
        <FlatList data={boards} renderItem={renderItem} keyExtractor={(b) => b.id} />
      )}
      <Pressable
        style={S.fab}
        onPress={async () => {
          const board = await createBoard('Untitled');
          await openBoard(board.id);
          navigation.navigate('BoardCanvas');
        }}
      >
        <Text style={S.fabText}>+ Board</Text>
      </Pressable>
    </View>
  );
}

function styles(t: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: t.color.bg,
    },
    item: {
      padding: t.spacing(2),
      borderBottomWidth: 1,
      borderBottomColor: t.color.border,
    },
    itemText: {
      color: t.color.text,
      fontSize: t.typography.body.size,
    },
    fab: {
      position: 'absolute',
      right: t.spacing(2),
      bottom: t.spacing(2),
      backgroundColor: t.color.primary,
      borderRadius: t.radius.lg,
      paddingHorizontal: t.spacing(2),
      paddingVertical: t.spacing(1),
      ...shadowStyle('md'),
    },
    fabText: {
      color: t.color.surface,
      fontSize: t.typography.body.size,
      fontWeight: '600',
    },
  });
}

import React, { useRef, useState } from 'react';
import { View, PanResponder, Pressable, Text, StyleSheet } from 'react-native';
import NodeView from '../components/NodeView';
import EdgeLayer from '../components/EdgeLayer';
import Toolbar from '../components/Toolbar';
import { useStore } from '../state/store';
import { useTheme } from '../theme/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { shadowStyle } from '../theme/theme';

type Props = NativeStackScreenProps<any, 'BoardCanvas'>;

export default function BoardCanvasScreen({ navigation }: Props) {
  const nodes = useStore((s) => s.nodes);
  const createNode = useStore((s) => s.createNode);
  const connectMode = useStore((s) => s.connectMode);
  const toggleConnectMode = useStore((s) => s.toggleConnectMode);
  const runAI = useStore((s) => s.runAI);
  const activeBoardId = useStore((s) => s.activeBoardId);
  const t = useTheme();
  const S = styles(t);

  const pan = useRef({ x: 0, y: 0 }).current;
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, g) => {
        setOffset({ x: pan.x + g.dx, y: pan.y + g.dy });
      },
      onPanResponderRelease: (_, g) => {
        pan.x += g.dx;
        pan.y += g.dy;
      },
    })
  ).current;

  return (
    <View style={S.container}>
      <View style={[S.canvas, { transform: [{ translateX: offset.x }, { translateY: offset.y }] }]} {...panResponder.panHandlers}>
        <EdgeLayer />
        {nodes.map((n) => (
          <NodeView
            key={n.id}
            {...n}
            onLongPress={(id) => navigation.navigate('NodeEditorModal', { nodeId: id })}
          />
        ))}
      </View>
      <Toolbar
        style={S.toolbar}
        connectMode={connectMode}
        onToggleConnect={toggleConnectMode}
        onOpenTasks={() => navigation.navigate('TasksPanel')}
        onRunAI={async () => {
          const include = nodes.filter((n) => n.content?.activeForPrompt).map((n) => n.id);
          const result = await runAI({ boardId: activeBoardId!, model: 'gpt-4', include });
          navigation.navigate('AIRunResultModal', { result });
        }}
        onResetZoom={() => {
          setOffset({ x: 0, y: 0 });
          pan.x = 0;
          pan.y = 0;
        }}
      />
      <Pressable
        style={S.fab}
        onPress={() => createNode({ id: `${Date.now()}`, title: 'Node', kind: 'note', x: 50, y: 50 })}
      >
        <Text style={S.fabText}>+ Node</Text>
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
    canvas: {
      flex: 1,
    },
    toolbar: {
      position: 'absolute',
      top: t.spacing(2),
      left: t.spacing(2),
    },
    fab: {
      position: 'absolute',
      right: t.spacing(2),
      bottom: t.spacing(2),
      backgroundColor: t.color.accent,
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

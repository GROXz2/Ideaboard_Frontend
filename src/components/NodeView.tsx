// /src/components/NodeView.tsx
import React from 'react';
import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { useTheme, shadowStyle, type Theme } from '../theme/theme';

export type NodeKind = 'role' | 'objective' | 'context' | 'constraints' | 'note' | 'task';

export type NodeViewProps = {
  id: string;
  title: string;
  kind: NodeKind;
  preview?: string;
  /** Canvas coordinates (absolute) */
  x: number;
  y: number;
  /** Visual size of the card (defaults to 'M') */
  size?: 'S' | 'M' | 'L';
  /** If true, highlights as part of the prompt */
  activeForPrompt?: boolean;
  /** Optional selection state (e.g., when connecting) */
  selected?: boolean;
  /** Events */
  onPress?: (id: string) => void;
  onLongPress?: (id: string) => void;
  /** Extra style overrides */
  style?: ViewStyle;
  /** Optional test id for E2E */
  testID?: string;
};

export default function NodeView(props: NodeViewProps) {
  const {
    id,
    title,
    kind,
    preview,
    x,
    y,
    size = 'M',
    activeForPrompt = false,
    selected = false,
    onPress,
    onLongPress,
    style,
    testID,
  } = props;

  const t = useTheme();
  const S = styles(t, { size, activeForPrompt, selected, x, y });

  return (
    <Pressable
      testID={testID ?? `node-${id}`}
      onPress={() => onPress?.(id)}
      onLongPress={() => onLongPress?.(id)}
      style={({ pressed }) => [S.root, pressed && S.pressed, style]}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={`Node ${kind}: ${title}`}
    >
      <View style={S.header}>
        <View style={S.badge}>
          <Text style={S.badgeText}>{kindLabel(kind)}</Text>
        </View>
      </View>

      <Text style={S.title} numberOfLines={1}>
        {title}
      </Text>

      {Boolean(preview) && (
        <Text style={S.preview} numberOfLines={3}>
          {preview}
        </Text>
      )}
    </Pressable>
  );
}

/** ===== Helpers ===== */

function kindLabel(kind: NodeKind): string {
  switch (kind) {
    case 'role':
      return 'Rol';
    case 'objective':
      return 'Objetivo';
    case 'context':
      return 'Contexto';
    case 'constraints':
      return 'Restricciones';
    case 'note':
      return 'Nota';
    case 'task':
      return 'Tarea';
    default:
      return kind;
  }
}

function styles(
  t: Theme,
  p: { size: 'S' | 'M' | 'L'; activeForPrompt: boolean; selected: boolean; x: number; y: number }
) {
  const WH = t.sizes.node[p.size];
  const borderColor = p.activeForPrompt ? t.color.primary : t.color.border;
  const borderStyle = p.selected ? 'dashed' : 'solid';

  return StyleSheet.create({
    root: {
      position: 'absolute',
      left: p.x,
      top: p.y,
      width: WH.w,
      height: WH.h,
      padding: t.spacing(1.5), // 12
      borderRadius: t.radius.md,
      backgroundColor: t.color.surface,
      borderWidth: 1.5,
      borderColor,
      borderStyle,
      ...(p.activeForPrompt ? shadowStyle('md') : {}),
    },
    pressed: {
      transform: [{ scale: 0.98 }],
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: t.spacing(0.5),
    },
    badge: {
      alignSelf: 'flex-start',
      paddingHorizontal: t.spacing(1),
      paddingVertical: t.spacing(0.5),
      borderRadius: t.radius.lg,
      backgroundColor: t.mode === 'light' ? t.color.bg : t.color.border,
      borderWidth: 1,
      borderColor: t.color.border,
    },
    badgeText: {
      fontSize: t.typography.micro.size,
      lineHeight: t.typography.micro.lh,
      color: t.color.textDim,
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: 0.4,
    },
    title: {
      fontSize: t.typography.body.size,
      lineHeight: t.typography.body.lh,
      color: t.color.text,
      fontWeight: '600',
      marginBottom: t.spacing(0.5),
    },
    preview: {
      fontSize: t.typography.caption.size,
      lineHeight: t.typography.caption.lh,
      color: t.color.textDim,
    },
  });
}

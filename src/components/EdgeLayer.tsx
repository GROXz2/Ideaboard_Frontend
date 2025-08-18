import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { useStore } from '../state/store';
import { useTheme } from '../theme/theme';

export default function EdgeLayer() {
  const edges = useStore((s) => s.edges);
  const nodes = useStore((s) => s.nodes);
  const t = useTheme();

  const lines = edges.map((e) => {
    const from = nodes.find((n) => n.id === e.from);
    const to = nodes.find((n) => n.id === e.to);
    if (!from || !to) return null;
    const fromSize = t.sizes.node[from.size || 'M'];
    const toSize = t.sizes.node[to.size || 'M'];
    const x1 = from.x + fromSize.w / 2;
    const y1 = from.y + fromSize.h / 2;
    const x2 = to.x + toSize.w / 2;
    const y2 = to.y + toSize.h / 2;
    return { id: e.id, x1, y1, x2, y2 };
  }).filter(Boolean) as { id: string; x1: number; y1: number; x2: number; y2: number }[];

  return (
    <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
      {lines.map((l) => (
        <Line key={l.id} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={t.color.border} strokeWidth={2} />
      ))}
    </Svg>
  );
}

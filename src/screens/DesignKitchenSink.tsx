import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/theme';
import NodeView from '../components/NodeView';
import TemplateCard from '../components/TemplateCard';
import EmptyState from '../components/EmptyState';

export default function DesignKitchenSink() {
  const t = useTheme();
  const S = styles(t);
  return (
    <View style={S.container}>
      <Text style={S.title}>Kitchen Sink</Text>
      <View style={{ height: t.sizes.node.M.h + t.spacing(2), width: '100%' }}>
        <NodeView id="demo1" title="Active" kind="note" x={t.spacing(1)} y={t.spacing(1)} activeForPrompt />
        <NodeView id="demo2" title="Inactive" kind="note" x={t.spacing(20)} y={t.spacing(1)} />
      </View>
      <TemplateCard id="tmp1" title="Template" description="Demo" price={0} onPress={() => {}} />
      <EmptyState message="Nothing here" />
    </View>
  );
}

function styles(t: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: t.color.bg, padding: t.spacing(2) },
    title: { fontSize: t.typography.h2.size, lineHeight: t.typography.h2.lh, color: t.color.text, marginBottom: t.spacing(2) },
  });
}

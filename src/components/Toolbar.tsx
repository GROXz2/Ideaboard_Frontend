import React from 'react';
import { View, Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, shadowStyle } from '../theme/theme';

export type ToolbarProps = {
  connectMode: boolean;
  onToggleConnect: () => void;
  onOpenTasks: () => void;
  onRunAI: () => void;
  onResetZoom: () => void;
  style?: ViewStyle;
};

export default function Toolbar(props: ToolbarProps) {
  const { connectMode, onToggleConnect, onOpenTasks, onRunAI, onResetZoom, style } = props;
  const t = useTheme();
  const S = styles(t);

  return (
    <View style={[S.root, style]}> 
      <Pressable style={S.btn} onPress={onToggleConnect}>
        <Text style={S.btnText}>{connectMode ? 'Connecting' : 'Connect'}</Text>
      </Pressable>
      <Pressable style={S.btn} onPress={onOpenTasks}>
        <Text style={S.btnText}>Tasks</Text>
      </Pressable>
      <Pressable style={S.btn} onPress={onRunAI}>
        <Text style={S.btnText}>Run AI</Text>
      </Pressable>
      <Pressable style={S.btn} onPress={onResetZoom}>
        <Text style={S.btnText}>Reset</Text>
      </Pressable>
    </View>
  );
}

function styles(t: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    root: {
      flexDirection: 'row',
      backgroundColor: t.color.surface,
      borderRadius: t.radius.lg,
      ...shadowStyle('md'),
      padding: t.spacing(1),
    },
    btn: {
      paddingHorizontal: t.spacing(1),
      paddingVertical: t.spacing(0.5),
    },
    btnText: {
      color: t.color.text,
      fontSize: t.typography.caption.size,
    },
  });
}

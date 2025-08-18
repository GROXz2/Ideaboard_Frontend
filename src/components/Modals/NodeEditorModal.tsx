import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/theme';
import { useStore } from '../../state/store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'NodeEditorModal'>;

export default function NodeEditorModal({ route, navigation }: Props) {
  const { nodeId } = route.params as { nodeId: string };
  const node = useStore((s) => s.nodes.find((n) => n.id === nodeId));
  const updateNode = useStore((s) => s.updateNode);
  const [title, setTitle] = useState(node?.title ?? '');
  const [preview, setPreview] = useState(node?.preview ?? '');
  const [activeForPrompt, setActiveForPrompt] = useState(node?.content?.activeForPrompt ?? false);
  const t = useTheme();
  const S = styles(t);

  return (
    <View style={S.container}>
      <TextInput value={title} onChangeText={setTitle} style={S.input} placeholder="Title" />
      <TextInput
        value={preview}
        onChangeText={setPreview}
        style={[S.input, S.textArea]}
        placeholder="Preview"
        multiline
      />
      <View style={S.row}>
        <Text style={S.label}>Use in prompt</Text>
        <Switch value={activeForPrompt} onValueChange={setActiveForPrompt} />
      </View>
      <Pressable
        style={S.saveBtn}
        onPress={() => {
          updateNode(nodeId, { title, preview, content: { ...(node?.content || {}), activeForPrompt } });
          navigation.goBack();
        }}
      >
        <Text style={S.saveText}>Save</Text>
      </Pressable>
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
    input: {
      borderWidth: 1,
      borderColor: t.color.border,
      borderRadius: t.radius.sm,
      padding: t.spacing(1),
      marginBottom: t.spacing(1),
      color: t.color.text,
    },
    textArea: {
      height: t.spacing(10),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: t.spacing(2),
    },
    label: {
      color: t.color.text,
      fontSize: t.typography.body.size,
    },
    saveBtn: {
      alignSelf: 'flex-end',
      backgroundColor: t.color.primary,
      paddingHorizontal: t.spacing(2),
      paddingVertical: t.spacing(1),
      borderRadius: t.radius.md,
    },
    saveText: {
      color: t.color.surface,
      fontSize: t.typography.body.size,
      fontWeight: '600',
    },
  });
}

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/theme';
import { useStore } from '../../state/store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'PurchaseModal'>;

export default function PurchaseModal({ route, navigation }: Props) {
  const { templateId } = route.params as { templateId: string };
  const purchase = useStore((s) => s.purchase);
  const t = useTheme();
  const S = styles(t);

  return (
    <View style={S.container}>
      <Text style={S.title}>Confirm purchase?</Text>
      <Pressable
        style={S.btn}
        onPress={async () => {
          await purchase(templateId);
          navigation.goBack();
        }}
      >
        <Text style={S.btnText}>Purchase</Text>
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
      justifyContent: 'center',
    },
    title: {
      fontSize: t.typography.h2.size,
      lineHeight: t.typography.h2.lh,
      color: t.color.text,
      marginBottom: t.spacing(2),
      textAlign: 'center',
    },
    btn: {
      alignSelf: 'center',
      backgroundColor: t.color.primary,
      paddingHorizontal: t.spacing(2),
      paddingVertical: t.spacing(1),
      borderRadius: t.radius.md,
    },
    btnText: {
      color: t.color.surface,
      fontSize: t.typography.body.size,
      fontWeight: '600',
    },
  });
}

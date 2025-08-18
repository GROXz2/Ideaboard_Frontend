import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme, shadowStyle } from '../theme/theme';

export type TemplateCardProps = {
  id: string;
  title: string;
  description: string;
  price: number;
  onPress: (id: string) => void;
};

export default function TemplateCard({ id, title, description, price, onPress }: TemplateCardProps) {
  const t = useTheme();
  const S = styles(t);

  return (
    <Pressable onPress={() => onPress(id)} style={S.root} accessibilityRole="button" accessibilityLabel={`Template ${title}`}>
      <Text style={S.title}>{title}</Text>
      <Text style={S.desc} numberOfLines={2}>{description}</Text>
      <View style={S.badge}>
        <Text style={S.badgeText}>${price.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

function styles(t: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    root: {
      backgroundColor: t.color.surface,
      borderRadius: t.radius.md,
      padding: t.spacing(1),
      marginBottom: t.spacing(1),
      ...shadowStyle('sm'),
    },
    title: {
      fontSize: t.typography.body.size,
      lineHeight: t.typography.body.lh,
      color: t.color.text,
      fontWeight: '600',
      marginBottom: t.spacing(0.5),
    },
    desc: {
      fontSize: t.typography.caption.size,
      lineHeight: t.typography.caption.lh,
      color: t.color.textDim,
    },
    badge: {
      alignSelf: 'flex-start',
      marginTop: t.spacing(0.5),
      paddingHorizontal: t.spacing(0.5),
      paddingVertical: t.spacing(0.25),
      borderRadius: t.radius.sm,
      backgroundColor: t.color.bg,
      borderWidth: 1,
      borderColor: t.color.border,
    },
    badgeText: {
      fontSize: t.typography.micro.size,
      color: t.color.text,
    },
  });
}

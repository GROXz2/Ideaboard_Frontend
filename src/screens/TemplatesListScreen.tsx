import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import TemplateCard from '../components/TemplateCard';
import { useStore } from '../state/store';
import { useTheme } from '../theme/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'TemplatesList'>;

export default function TemplatesListScreen({ navigation }: Props) {
  const templates = useStore((s) => s.list);
  const loadTemplates = useStore((s) => s.loadTemplates);
  const t = useTheme();
  const S = styles(t);

  useEffect(() => {
    loadTemplates();
  }, []);

  return (
    <View style={S.container}>
      <FlatList
        data={templates}
        keyExtractor={(t) => t.id}
        renderItem={({ item }) => (
          <TemplateCard id={item.id} title={item.title} description={item.description} price={item.price} onPress={() => navigation.navigate('TemplateDetail', { id: item.id })} />
        )}
      />
    </View>
  );
}

function styles(t: ReturnType<typeof useTheme>) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: t.color.bg,
      padding: t.spacing(1),
    },
  });
}

import { View, Text, FlatList } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { useRouter } from 'expo-router';

const mockProjects = [
  { id: '1', name: 'Proyecto Demo 1' },
  { id: '2', name: 'Proyecto Demo 2' }
];

export default function DashboardScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC', padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '700', color: '#2563EB', marginBottom: 16 }}>Proyectos</Text>
      <FlatList
        data={mockProjects}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PrimaryButton title={item.name} onPress={() => router.push(`/project/${item.id}`)} />
        )}
      />
      <PrimaryButton title="Crear Proyecto" onPress={() => {}} style={{ marginTop: 24 }} />
    </View>
  );
}

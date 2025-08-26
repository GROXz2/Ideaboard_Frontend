import { View, Text, StyleSheet } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

const columns = ['Temario', 'Clases', 'Evaluaciones'];
const mockItems = [
  { key: '1', label: 'Tema 1', column: 0 },
  { key: '2', label: 'Clase 1', column: 1 },
  { key: '3', label: 'Evaluación 1', column: 2 }
];

export default function BoardKanban() {
  // ...mock local state for drag...
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Kanban</Text>
      {/* Implementación mock, puedes expandir con DraggableFlatList */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {columns.map((col, idx) => (
          <View key={col} style={styles.col}>
            <Text style={styles.colTitle}>{col}</Text>
            {/* Render items por columna */}
            {mockItems.filter(item => item.column === idx).map(item => (
              <View key={item.key} style={styles.card}>
                <Text>{item.label}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: { marginTop: 24 },
  title: { fontSize: 18, fontWeight: '700', color: '#2563EB', marginBottom: 12 },
  col: { flex: 1, marginHorizontal: 4, backgroundColor: '#E5E7EB', borderRadius: 8, padding: 8 },
  colTitle: { fontWeight: '700', color: '#1F2937', marginBottom: 8 },
  card: { backgroundColor: '#DBEAFE', borderRadius: 6, padding: 6, marginBottom: 6 }
});

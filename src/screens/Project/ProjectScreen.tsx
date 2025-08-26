import { View, Text, ScrollView } from 'react-native';
import BlockCard from '../../components/BlockCard';
import SourceChip from '../../components/SourceChip';
import PrimaryButton from '../../components/PrimaryButton';

export default function ProjectScreen() {
  // Mock state
  const [blocks, setBlocks] = React.useState([
    { title: 'Rol', active: true, fidelity: 90 },
    { title: 'Objetivo', active: true, fidelity: 70 },
    { title: 'Contexto', active: false, fidelity: 0 },
    { title: 'Restricciones', active: true, fidelity: 40 }
  ]);
  const handleToggle = (idx: number, val: boolean) => {
    setBlocks(b => b.map((block, i) => i === idx ? { ...block, active: val } : block));
  };
  const handleFidelity = (idx: number, val: number) => {
    setBlocks(b => b.map((block, i) => i === idx ? { ...block, fidelity: val } : block));
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F8FAFC', padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '700', color: '#2563EB', marginBottom: 12 }}>Bloques</Text>
      {blocks.map((block, idx) => (
        <BlockCard
          key={block.title}
          title={block.title}
          active={block.active}
          fidelity={block.fidelity}
          onToggle={val => handleToggle(idx, val)}
          onFidelity={val => handleFidelity(idx, val)}
        />
      ))}
      <PrimaryButton title="Generar" onPress={() => {}} />
      <View style={{ marginTop: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937' }}>Output:</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
          <Text style={{ color: '#1F2937', fontSize: 14 }}>Lorem ipsum output...</Text>
          <SourceChip page={2} />
        </View>
      </View>
    </ScrollView>
  );
}

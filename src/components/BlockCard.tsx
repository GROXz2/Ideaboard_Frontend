import { View, Text, Switch, StyleSheet } from 'react-native';
import FidelitySlider from './FidelitySlider';
import { colors } from '../theme/colors';

export default function BlockCard({ title, active, fidelity, onToggle, onFidelity }:{
  title:string; active:boolean; fidelity:number; onToggle:(v:boolean)=>void; onFidelity:(v:number)=>void;
}) {
  return (
    <View style={[styles.card, active ? styles.active : styles.inactive]}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <Switch value={active} onValueChange={onToggle}/>
      </View>
      {active && <FidelitySlider value={fidelity} onChange={onFidelity} />}
    </View>
  );
}
const styles = StyleSheet.create({
  card: { padding: 12, borderRadius: 12, borderWidth: 1, marginBottom: 10 },
  active: { backgroundColor: colors.blockActiveBg, borderColor: colors.blockActiveBorder },
  inactive:{ backgroundColor: colors.blockInactiveBg, borderColor: colors.muted },
  row: { flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  title: { color: colors.text, fontSize: 16, fontWeight: '700' },
});

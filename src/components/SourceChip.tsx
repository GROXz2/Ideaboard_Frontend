import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
export default function SourceChip({ page }:{page:number}) {
  return (
    <View style={styles.chip}><Text style={styles.txt}>Fuente: pág. {page}</Text></View>
  );
}
const styles = StyleSheet.create({
  chip: { backgroundColor: colors.blockActiveBg, borderColor: colors.blockActiveBorder, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  txt: { color: colors.text, fontSize: 12, fontWeight: '600' }
});

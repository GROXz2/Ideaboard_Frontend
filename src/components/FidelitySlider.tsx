import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors } from '../theme/colors';

export default function FidelitySlider({ value, onChange }:{value:number; onChange:(v:number)=>void}) {
  const label =
    value >= 90 ? 'Restricción absoluta' :
    value >= 70 ? 'Prioridad estricta' :
    value >= 40 ? 'Guía principal' :
    value >= 1  ? 'Inspiración flexible' : 'Ignorar';
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>Fidelidad: {value} – {label}</Text>
      <Slider
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor={colors.success}
        maximumTrackTintColor={colors.muted}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: { marginTop: 8 },
  label: { color: colors.text, fontSize: 14, marginBottom: 6 }
});

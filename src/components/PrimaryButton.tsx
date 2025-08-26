import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function PrimaryButton({ title, onPress, disabled }: {title:string; onPress:()=>void; disabled?:boolean}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={!!disabled}
      style={({ pressed }) => [
        styles.btn,
        disabled && { opacity: 0.5 },
        pressed && { transform: [{ scale: 0.98 }] },
      ]}>
      <Text style={styles.txt}>{title}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  btn: { backgroundColor: colors.primary, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  txt: { color: 'white', fontSize: 16, fontWeight: '600' },
});

import { View, Text } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { useRouter } from 'expo-router';

export default function AuthScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
      <Text style={{ fontSize: 24, marginBottom: 32, color: '#2563EB', fontWeight: '700' }}>Ideaboard</Text>
      <PrimaryButton title="Entrar (Demo)" onPress={() => router.replace('/dashboard')} />
    </View>
  );
}

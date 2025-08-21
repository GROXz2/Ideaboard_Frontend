import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function BoardDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>Board #{id}</Text>
      <Text>Aquí cargaremos nodos/edges.</Text>
    </View>
  );
}

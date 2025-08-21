import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Boards() {
  return (
    <View style={{ flex: 1, padding: 16, gap: 12, justifyContent: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>Boards</Text>
      <Text>Tu lista de tableros iría aquí.</Text>
      <Link href="/board/123" asChild>
        <Pressable style={{ padding: 12, borderWidth: 1, borderRadius: 8 }}>
          <Text>Abrir Board de prueba</Text>
        </Pressable>
      </Link>
    </View>
  );
}

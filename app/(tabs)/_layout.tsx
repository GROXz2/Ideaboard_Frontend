import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Boards" }} />
      <Tabs.Screen name="templates" options={{ title: "Templates" }} />
    </Tabs>
  );
}

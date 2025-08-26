<<<<<<< HEAD
import 'react-native-gesture-handler';
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
=======
﻿import { Slot, Redirect } from "expo-router";

export default function Root() {
  // si quieres una splash o auth gate, ponla aquí
  return <Redirect href="/(tabs)" />;
>>>>>>> a1d33ad (WIP: Expo 53 scaffolding + UI components + config)
}

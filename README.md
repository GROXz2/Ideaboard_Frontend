# IdeaBoard

## Requisitos
- Node.js LTS
- Android SDK (para emulador)

## Instalación limpia
```bash
rm -rf node_modules package-lock.json .expo .parcel-cache
npm install
npm run start
```

## Scripts
- `npm run web` – inicia en el navegador
- `npm run android` – abre en Expo Go (SDK 53)
- `npm run android:dev` – crea y ejecuta un development build
- `npm run clean` – borra dependencias y reinstala
- `npm run typecheck` – revisa tipos TypeScript
- `npm run lint` – ejecuta ESLint

## Troubleshooting
Pantalla en blanco? Verifica que `main` en `package.json` sea `expo-router/entry` y que las dependencias web (`react-dom`, `react-native-web`, `@expo/metro-runtime`) estén instaladas. Consulta la consola del navegador para más detalles.

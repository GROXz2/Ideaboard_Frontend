# Dependency update runbook

The following PowerShell commands refresh dependencies and resolve peer conflicts.

```powershell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
npx expo install react-native-safe-area-context react-native-screens react-native-gesture-handler react-native-reanimated @expo/vector-icons
npx expo start -c
npm test
```

If npm still complains, try the temporary workaround:

```powershell
npm install --legacy-peer-deps
```

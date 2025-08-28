# Backup archivos rotos
if (Test-Path package.json) { Rename-Item -Force package.json package.broken.json }
if (Test-Path app.json) { Rename-Item -Force app.json app.broken.json }

# Reescribe package.json mínimo válido en UTF-8 sin BOM
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$pkg = @'

{
"name": "ideaboard",
"private": true,
"version": "1.0.0",
"main": "index.js",
"scripts": {
"start": "expo start",
"start:clean": "expo start -c",
"web": "expo start --web",
"android": "expo start --android",
"ios": "expo start --ios",
"postinstall:align": "npx expo-doctor --fix || true",
"clean:win": "powershell -Command \"Remove-Item -Recurse -Force node_modules, package-lock.json\""
},
"dependencies": {
"expo": "~53.0.0"
}
}
'@
[System.IO.File]::WriteAllText("package.json", $pkg, $utf8NoBom)

# Reescribe app.json mínimo válido en UTF-8 sin BOM
$app = @'

{
"expo": {
"name": "IdeaBoard",
"slug": "ideaboard",
"scheme": "ideaboard",
"version": "1.0.0",
"orientation": "portrait",
"web": { "bundler": "metro" }
}
}
'@
[System.IO.File]::WriteAllText("app.json", $app, $utf8NoBom)

# Limpieza segura
if (Test-Path node_modules) { Remove-Item -Recurse -Force node_modules }
if (Test-Path package-lock.json) { Remove-Item -Force package-lock.json }

# Instala y alinea dependencias
npm install
npx expo install react react-native react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @expo/vector-icons expo-document-picker expo-file-system

# Babel config con reanimated plugin
$babel = @'

module.exports = function (api) {
  api.cache(true);
  return { presets: ['babel-preset-expo'], plugins: ['react-native-reanimated/plugin'] };
};
'@
[System.IO.File]::WriteAllText("babel.config.js", $babel, $utf8NoBom)

# Doctor y arranque
npx expo-doctor --fix
npx expo start -c

Write-Host ""
Write-Host "Listo. Dentro de la consola de Expo, presiona:"
Write-Host "  w para Web"
Write-Host "  a para Android"
Write-Host "  i para iOS"
Write-Host ""
Write-Host "Si aparece algún error, copia el mensaje textual y pégalo aquí para diagnóstico."

# Windows install runbook

Use these PowerShell commands to reset dependencies and start the Expo app.

```powershell
npm run clean:win
npm install
npm run postinstall:align
npm run start:clean
# Launch web (optional)
npm run web
npm test
```

If npm still complains, try the temporary workaround:

```powershell
npm install --legacy-peer-deps
```

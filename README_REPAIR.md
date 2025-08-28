# Reparación rápida Expo 53 / JSON

1. Abre PowerShell en la raíz del repo (donde está package.json).
2. Ejecuta:

   ```powershell
   powershell -ExecutionPolicy Bypass -File .\scripts\repair-expo53.ps1
   ```

3. Espera a que termine.  
   Dentro de la consola de Expo, presiona:
   - `w` para Web
   - `a` para Android
   - `i` para iOS

4. Si aparece algún error, copia el mensaje textual y pégalo aquí para diagnóstico.

---

**Notas:**
- El script hace backup automático de archivos rotos como `package.broken.json` y `app.broken.json`.
- Reescribe los archivos clave en formato JSON válido y UTF-8 sin BOM.
- Instala dependencias compatibles con Expo 53.
- Si tienes assets personalizados (icon, splash), no se borran.

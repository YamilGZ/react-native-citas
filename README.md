# 🐾 Citas Veterinaria — React Native

Aplicación móvil para administrar citas de una veterinaria. Desarrollada con **React Native 0.87** y la **New Architecture** (Bridgeless + Fabric).

---

## 📋 Requisitos

- **Node.js** >= 22.11.0
- **Android SDK** (API 24+, compileSdk 37)
- **Android Emulator** o dispositivo físico conectado
- **Java JDK** 17+
- **Git Bash** o PowerShell (Windows)

---

## 🚀 Cómo levantar el proyecto

### Opción 1: Script automático (Recomendado)

Ejecutá el script que hace todo automáticamente:

```powershell
npm run android:full
```

Este script:
- Cierra Metro anterior si está corriendo
- Inicia el emulador si no está abierto
- Compila e instala la APK
- Abre la app conectada a Metro

### Opción 2: Manual por pasos

**Paso 1 — Metro bundler:**

```bash
npx react-native start
```

**Paso 2 — Compilar e instalar:**

En otra terminal:

```bash
cd android
./gradlew clean
./gradlew :app:assembleDebug
cd ..
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
adb shell am start -n com.citas/.MainActivity
```

---

## 🪵 Cómo ver los logs (console.log / console.warn)

En React Native 0.87 con Hermes, los `console.log` a veces no aparecen en la terminal de Metro. Usá este comando para verlos en tiempo real:

```bash
adb logcat -s ReactNativeJS:D
```

**Filtrar solo tu app:**

```bash
adb logcat -s ReactNativeJS:D *:S
```

**Ver todo el log del sistema (útil para errores nativos):**

```bash
adb logcat
```

**Limpiar y empezar desde cero:**

```bash
adb logcat -c
adb logcat -s ReactNativeJS:D
```

---

## ⌨️ Comandos útiles de Metro

Una vez que Metro esté corriendo, presioná:

| Tecla | Acción |
|-------|--------|
| `r` | Recargar app(s) |
| `d` | Abrir Dev Menu |
| `j` | Abrir DevTools (React Native DevTools) |
| `Ctrl + C` | Cerrar Metro |

---

## 📁 Estructura del proyecto

```
react-native-citas/
├── android/              # Proyecto Android nativo
├── ios/                  # Proyecto iOS nativo
├── src/
│   └── components/
│       └── Formulario.js  # Formulario de nueva cita
├── App.tsx               # Punto de entrada principal
├── start.ps1             # Script automático de inicio
├── package.json
└── README.md
```

---

## 📦 Dependencias principales

| Paquete | Versión | Uso |
|---------|---------|-----|
| `react-native` | 0.87.1 | Framework principal |
| `react` | 19.2.3 | Librería React |
| `react-native-safe-area-context` | ^5.5.2 | SafeAreaView |
| `react-native-date-picker` | ^5.0.13 | Selector de fecha/hora |

---

## 🛠️ Solución de problemas

### Pantalla en negro / App no carga

```bash
adb shell am force-stop com.citas
adb shell pm clear com.citas
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
adb shell am start -n com.citas/.MainActivity
```

### Emulador no se detecta

```bash
adb devices
```

Si no aparece, iniciá el emulador manualmente:

```bash
emulator -avd Pixel_4
```

### Error "Metro ya está corriendo"

Matá el proceso anterior:

```bash
netstat -ano | findstr 8081
taskkill /F /PID <PID>
```

### `react-native-date-picker` no compila

Si ves error sobre `proguard-android.txt`, editá:

```
node_modules/react-native-date-picker/android/build.gradle
```

Cambiá `proguard-android.txt` por `proguard-android-optimize.txt`.

---

## 👨‍💻 Autor

- **Yamil Zaracho**

---

## 📄 Licencia

Este proyecto es privado y fue generado con [React Native CLI](https://github.com/react-native-community/cli).

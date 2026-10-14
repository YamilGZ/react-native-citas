# 📦 Guía para generar la APK de Citas Veterinaria

Esta guía explica paso a paso cómo generar un archivo **APK que funcione sin depender de la computadora** (sin necesidad de tener Metro corriendo).

Para eso se debe generar una **build de release**, que empaqueta el código JavaScript dentro del APK.

---

## ⚠️ Diferencia entre Debug y Release

| Tipo | Requiere Metro | Tamaño | Uso |
|------|---------------|--------|-----|
| **Debug** | Sí | ~120 MB | Desarrollo y pruebas rápidas |
| **Release** | No | ~50–70 MB | Distribución y uso final |

La APK de debug que se genera con `npm run android` o `./gradlew assembleDebug` **no sirve para usarla sola**, porque busca el servidor de Metro en la red. La APK de release incluye el bundle JS y funciona de forma independiente.

---

## 📋 Requisitos previos

Antes de empezar, asegurate de tener:

- Android SDK instalado y configurado.
- Variable de entorno `ANDROID_HOME` o `ANDROID_SDK_ROOT` apuntando al SDK.
- Java JDK 17+ instalado.
- Node.js >= 22.11.0.
- Dependencias del proyecto instaladas:

```bash
npm install
```

---

## 🔐 Paso 1: Crear el keystore de firma

Una APK de release debe estar **firmada digitalmente**. Para eso se necesita un archivo `.keystore`.

### Opción A: Crear un keystore nuevo (recomendado para producción)

Abrí una terminal en la carpeta `android/` y ejecutá:

```bash
cd android
keytool -genkeypair -v -keystore citas-release-key.keystore -alias citas -keyalg RSA -keysize 2048 -validity 10000
```

Te pedirá datos:

- **Contraseña del keystore**: elegí una segura y recordala.
- **Nombre y apellido**: por ejemplo `Yamil Zaracho`.
- **Nombre de la unidad organizativa**: podés dejarlo vacío.
- **Organización**: podés dejarlo vacío.
- **Ciudad/Localidad**: tu ciudad.
- **Provincia**: tu provincia.
- **Código de país**: por ejemplo `AR` para Argentina.

Al final confirmá con **sí**.

Esto crea el archivo:

```
android/citas-release-key.keystore
```

> ⚠️ **Importante:** guardá bien este archivo y sus contraseñas. Sin ellos no vas a poder actualizar la app en Google Play en el futuro.

### Opción B: Usar el keystore de debug (solo para pruebas internas)

Si querés generar la APK de release solo para probar en tu celular sin crear un keystore propio, podés usar el `debug.keystore` que ya existe. Sin embargo, **esto no es seguro para distribución**.

---

## ⚙️ Paso 2: Configurar las variables de firma

Las contraseñas del keystore no deben guardarse directamente en `build.gradle` para evitar exponerlas. Lo recomendado es guardarlas en el archivo `~/.gradle/gradle.properties` de tu usuario.

Abrí o creá el archivo:

- **Windows:** `C:\Users\TU_USUARIO\.gradle\gradle.properties`
- **macOS/Linux:** `~/.gradle/gradle.properties`

Agregá al final:

```properties
CITAS_UPLOAD_STORE_FILE=citas-release-key.keystore
CITAS_UPLOAD_KEY_ALIAS=citas
CITAS_UPLOAD_STORE_PASSWORD=tu_contraseña_del_keystore
CITAS_UPLOAD_KEY_PASSWORD=tu_contraseña_de_la_clave
```

Reemplazá `tu_contraseña_del_keystore` y `tu_contraseña_de_la_clave` por las que usaste en el Paso 1. Si usaste la misma contraseña para ambas, ponela en ambas propiedades.

---

## 🛠️ Paso 3: Modificar `android/app/build.gradle`

Abrí el archivo `android/app/build.gradle` y buscá el bloque `signingConfigs`. Debería quedar así:

```gradle
signingConfigs {
    debug {
        storeFile file('debug.keystore')
        storePassword 'android'
        keyAlias 'androiddebugkey'
        keyPassword 'android'
    }
    release {
        if (project.hasProperty('CITAS_UPLOAD_STORE_FILE')) {
            storeFile file(CITAS_UPLOAD_STORE_FILE)
            storePassword CITAS_UPLOAD_STORE_PASSWORD
            keyAlias CITAS_UPLOAD_KEY_ALIAS
            keyPassword CITAS_UPLOAD_KEY_PASSWORD
        }
    }
}
```

Luego buscá el bloque `buildTypes` y asegurate de que `release` use `signingConfigs.release`:

```gradle
buildTypes {
    debug {
        signingConfig signingConfigs.debug
    }
    release {
        signingConfig signingConfigs.release
        minifyEnabled enableProguardInReleaseBuilds
        proguardFiles getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro"
    }
}
```

Guardá el archivo.

---

## 🧹 Paso 4: Limpiar builds anteriores

Antes de generar la release, limpiá la carpeta de builds para evitar conflictos:

```bash
cd android
./gradlew clean
```

También podés limpiar la caché de Metro desde la raíz del proyecto:

```bash
cd ..
npx react-native start --reset-cache
```

(o simplemente borrá la carpeta `node_modules/.cache` si existe).

---

## 🏗️ Paso 5: Generar la APK de release

En la carpeta `android/` ejecutá:

```bash
cd android
./gradlew assembleRelease
```

Este comando:

- Empaqueta el bundle de JavaScript dentro del APK.
- Compila el código nativo.
- Firma la APK con el keystore configurado.

El proceso puede tardar entre **3 y 10 minutos** la primera vez.

Si todo sale bien, verás:

```
BUILD SUCCESSFUL
```

---

## 📁 Paso 6: Ubicar la APK generada

La APK de release se encuentra en:

```
android/app/build/outputs/apk/release/app-release.apk
```

Desde la raíz del proyecto, la ruta completa es:

```
c:\laragon\www\react-native-citas\android\app\build\outputs\apk\release\app-release.apk
```

---

## 📲 Paso 7: Instalar en un dispositivo Android

### Opción 1: Con ADB (desde la PC)

Conectá el celular por USB con **depuración USB activada** y ejecutá:

```bash
adb install -r android/app/build/outputs/apk/release/app-release.apk
```

La app se instalará con el nombre **“citas”** y podés usarla sin necesidad de tener la computadora cerca.

### Opción 2: Pasar el archivo manualmente al celular

1. Copiá `app-release.apk` al celular por WhatsApp, email, cable USB, Drive, etc.
2. En el celular, abrí el archivo desde el explorador de archivos.
3. Si te pide permiso, activá **“Instalar apps de orígenes desconocidos”**.
4. Toqué **Instalar**.

---

## 🧪 Paso 8: Verificar que funciona sola

1. Desconectá el celular de la computadora (o apagá el Wi-Fi si usabas Metro).
2. Abrí la app.
3. Creá una cita, editála, eliminála y verificá que todo funcione.

Si la app se abre y permite usar el CRUD completo sin errores de conexión, la APK de release está lista.

---

## 🔄 Cómo actualizar la app

Cuando hagas cambios en el código y quieras una nueva APK:

```bash
cd android
./gradlew clean
./gradlew assembleRelease
```

Luego volvé a instalarla con:

```bash
adb install -r android/app/build/outputs/apk/release/app-release.apk
```

El flag `-r` reemplaza la versión anterior si existe.

---

## 🚨 Solución de problemas comunes

### Error: "Keystore file not found"

Verificá que:
- El archivo `.keystore` exista dentro de `android/`.
- La propiedad `CITAS_UPLOAD_STORE_FILE` tenga el nombre correcto.

### Error: "Cannot find key"

Verificá que el `keyAlias` en `gradle.properties` sea exactamente igual al alias que usaste al crear el keystore.

### Error: "Keystore was tampered with, or password was incorrect"

Las contraseñas en `gradle.properties` no coinciden con las del keystore. Revisá mayúsculas, minúsculas y espacios.

### Error: "Unable to load script. Make sure you are either running a Metro server or that your bundle is packaged"

Eso significa que la APK fue generada como debug, no como release. Asegurate de usar:

```bash
./gradlew assembleRelease
```

y no:

```bash
./gradlew assembleDebug
```

### Error: "Could not determine the dependencies of task ':app:mergeReleaseNativeLibs'"

Probablemente falte configurar el NDK. Verificá que el Android SDK tenga instalado el NDK correspondiente a la versión que pide el proyecto.

---

## 📚 Referencias oficiales

- [React Native — Publishing to Google Play Store](https://reactnative.dev/docs/signed-apk-android)
- [Android Developers — Sign your app](https://developer.android.com/studio/publish/app-signing)

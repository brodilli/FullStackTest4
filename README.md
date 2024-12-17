# FullstackTest4 - Aplicación MERN AITIU

¡Bienvenido/a a FullstackTest4! Esta aplicación es una aplicación MERN (MongoDB, Express, React, Node.js) que puedes ejecutar localmente.

## Instrucciones de Instalación

Asegúrate de tener Node.js y npm instalados en tu sistema antes de continuar.

### 1. Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/tu-usuario/FullstackTest4.git
```

### 2. Navega al directorio del proyecto:

```bash
cd FullstackTest4
```

### 3. Instala las dependencias del servidor y del cliente:

```bash
npm install
cd frontend
npm install
```

---

## Ejecución de la Aplicación

Ejecuta la aplicación usando el siguiente comando en el directorio raíz:

```bash
npm run dev
```

Esto iniciará tanto el servidor como el cliente simultáneamente. La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## Instrucciones Especiales para Usuarios de Mac

Si eres usuario de **Mac**, sigue los siguientes pasos adicionales antes de ejecutar el proyecto:

1. En la carpeta `frontend/node_modules/react-scripts/config` encontrarás el archivo **webpack.config.js**.

2. Busca el siguiente bloque de código y coméntalo:

   ```javascript
   new ModuleScopePlugin(paths.appSrc, [
     paths.appPackageJson,
     reactRefreshRuntimeEntry,
     reactRefreshWebpackPluginRuntimeEntry,
     babelRuntimeEntry,
     babelRuntimeEntryHelpers,
     babelRuntimeRegenerator,
   ]),
   ```

3. Guarda los cambios.

4. Vuelve a ejecutar el proyecto con:

   ```bash
   npm run dev
   ```

---

¡Listo! Ahora la aplicación debería ejecutarse sin problemas en tu Mac.

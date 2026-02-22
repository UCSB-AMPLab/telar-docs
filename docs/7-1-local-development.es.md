---
layout: docs
title: 7.1. Desarrollo local
parent: 7. Para desarrolladores
grand_parent: Documentación
nav_order: 1
lang: es
permalink: /guia/desarrolladores/desarrollo-local/
---

# Desarrollo local

Referencia completa para desarrollo local, comandos de construcción y solución de problemas.

## Requisitos previos

### Software requerido

- **Ruby 3.0+**: Runtime de Jekyll
- **Bundler**: Gestión de dependencias de Ruby
- **Python 3.9+**: Generación IIIF y procesamiento CSV
- **Node.js 18+**: Empaquetado de JavaScript (esbuild)
- **Git**: Control de versiones

### Guías de instalación

**macOS (Homebrew):**

```bash
brew install ruby python node git
gem install bundler
```

**Ubuntu/Debian:**

```bash
sudo apt-get install ruby-full python3 python3-pip nodejs npm git build-essential
gem install bundler
```

**Windows:**

- Instala [RubyInstaller](https://rubyinstaller.org/)
- Instala [Python](https://www.python.org/downloads/)
- Instala [Node.js](https://nodejs.org/) (se recomienda la versión LTS)
- Instala [Git for Windows](https://gitforwindows.org/)

## Configuración del proyecto

### Configuración inicial

```bash
# Clona el repositorio
git clone https://github.com/usuario/tu-sitio-telar.git
cd tu-sitio-telar

# Instala dependencias de Ruby
bundle install

# Instala dependencias de Python
pip install -r requirements.txt

# Instala dependencias de Node.js
npm install
```

### Configuración

Edita `_config.yml` para desarrollo local:

```yaml
baseurl: ""  # Vacío para desarrollo local
url: "http://localhost:4001"
```

## Comandos de construcción

### Inicio rápido: script de construcción (recomendado)

La forma más sencilla de construir y servir tu sitio Telar localmente es usando el script de construcción todo‑en‑uno:

```bash
# Construye y sirve en el puerto 4001 (predeterminado)
python3 scripts/build_local_site.py

# Solo construir, sin iniciar servidor
python3 scripts/build_local_site.py --build-only

# Usar un puerto diferente
python3 scripts/build_local_site.py --port 4000

# Omitir generación de teselas IIIF (reconstrucciones más rápidas cuando las imágenes no han cambiado)
python3 scripts/build_local_site.py --skip-iiif

# Omitir la descarga desde Google Sheets (usa los CSV existentes)
python3 scripts/build_local_site.py --skip-fetch
```

Este script ejecuta en secuencia todos los pasos necesarios de construcción, imitando lo que hace GitHub Actions durante el despliegue. También detiene instancias de Jekyll que estén ejecutándose antes de iniciar una nueva.

### Comandos principales (manuales)

Si prefieres ejecutar los pasos por separado:

```bash
# 1. Trae datos desde Google Sheets (si está habilitado)
python3 scripts/fetch_google_sheets.py

# 2. Convierte CSVs a JSON
python3 scripts/csv_to_json.py

# 3. Genera archivos de colección de Jekyll
python3 scripts/generate_collections.py

# 4. Genera teselas (*tiles*) IIIF
python3 scripts/generate_iiif.py --base-url http://localhost:4001

# 5. Sirve con recarga automática
bundle exec jekyll serve --livereload --port 4001

# Solo construir (salida a _site/)
bundle exec jekyll build

# Limpiar artefactos de construcción
bundle exec jekyll clean
```

### Opciones de comando

**Opciones de Jekyll serve:**

```bash
# Sirve en puerto personalizado
bundle exec jekyll serve --port 4001

# Sirve en red local
bundle exec jekyll serve --host 0.0.0.0

# Construcción incremental (más rápida)
bundle exec jekyll serve --incremental

# Deshabilitar la recarga automática
bundle exec jekyll serve
```

**Opciones de generación IIIF:**

```bash
# Especifica directorio fuente diferente
python3 scripts/generate_iiif.py --source-dir ruta/a/imagenes

# Especifica URL base personalizada
python3 scripts/generate_iiif.py --base-url https://misitio.org

# Procesa solo imagen específica
python3 scripts/generate_iiif.py --image textile-001.jpg
```

## Flujo de trabajo de desarrollo

### Flujo de trabajo diario

```bash
# 1. Inicia servidor Jekyll
bundle exec jekyll serve --livereload

# 2. Haz cambios al contenido
# - Edita CSVs en components/structures/
# - Edita markdown en components/texts/
# - Agrega imágenes a components/images/

# 3. Reconstruye los datos (cuando cambian los CSV)
python3 scripts/csv_to_json.py

# 4. Regenera las teselas (*tiles*) (cuando cambian las imágenes)
python3 scripts/generate_iiif.py

# 5. Jekyll recarga automáticamente el navegador
# El sitio se actualiza automáticamente
```

## Estructura de directorios

```text
tu-sitio-telar/
├── _config.yml              # Configuración del sitio
├── _data/                   # Datos JSON generados
│   ├── objects.json
│   ├── project.json
│   └── stories/
├── _jekyll-files/           # Colecciones autogeneradas
│   ├── _stories/
│   ├── _objects/
│   └── _glossary/
├── _layouts/                # Plantillas de página
│   ├── default.html
│   ├── story.html
│   └── object.html
├── _includes/               # Componentes reutilizables
│   ├── header.html
│   └── footer.html
├── assets/                  # Recursos estáticos
│   ├── css/
│   ├── js/
│   └── images/
├── components/              # CONTENIDO FUENTE (¡editar aquí!)
│   ├── structures/          # Archivos CSV
│   ├── images/              # Imágenes fuente
│   └── texts/               # Archivos Markdown
├── iiif/                    # Teselas (*tiles*) IIIF generadas
├── scripts/                 # Scripts de construcción
│   ├── build_local_site.py  # Build local todo‑en‑uno
│   ├── fetch_google_sheets.py
│   ├── csv_to_json.py
│   ├── generate_collections.py
│   └── generate_iiif.py
└── _site/                   # Sitio construido (¡no editar!)
```

## Solución de problemas

### Problemas comunes

**Jekyll no inicia:**

```bash
# Actualiza dependencias
bundle update

# Limpia y reintenta
bundle exec jekyll clean
bundle exec jekyll serve
```

**Los cambios no aparecen:**

```bash
# Reinicia Jekyll (Ctrl+C, luego reinicia)
bundle exec jekyll serve --livereload

# Recarga forzada del navegador (Cmd+Shift+R o Ctrl+Shift+R)
```

**Las teselas (*tiles*) IIIF no se generan:**

```bash
# Verifica dependencias de Python
pip install -r requirements.txt

# Verifica que existan archivos de imagen
ls -la components/images/

# Verifica mensajes de error
python3 scripts/generate_iiif.py
```

**La conversión CSV a JSON falla:**

```bash
# Verifica sintaxis CSV
cat components/structures/story-1.csv

# Verifica que existan archivos markdown
ls -la components/texts/stories/

# Ejecuta con salida detallada
python3 scripts/csv_to_json.py --verbose
```

### Problemas de dependencias

**bundle install falla:**

```bash
# Actualiza RubyGems
gem update --system

# Limpia caché de bundle
bundle clean --force
bundle install
```

**pip install falla:**

```bash
# Actualiza pip
pip install --upgrade pip

# Usa virtualenv
python3 -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Problemas de inserción (*embed*)

**Los botones de navegación no funcionan en el iframe:**

Verifica si el modo *embed* se detecta correctamente:

1. Abre DevTools del navegador en el iframe (clic derecho en el contenido del iframe)
2. Verifica errores de JavaScript en la consola
3. Verifica el parámetro `?embed=true` en la URL
4. Confirma que la clase `body.embed-mode` está aplicada:
   ```javascript
   document.body.classList.contains('embed-mode')
   ```

Si el modo *embed* no se detecta, verifica que el parámetro de URL sea correcto.

**Las imágenes no cargan en la vista insertada:**

Las teselas IIIF no cargan en el iframe:

1. Verifica errores de CORS en la consola del navegador
2. Verifica que tu sitio esté desplegado y accesible públicamente:
   ```bash
   # Prueba la URL del manifiesto IIIF
   curl https://tusitio.com/iiif/objects/object-1/info.json
   ```
3. Asegúrate de que el despliegue de GitHub Pages se completó exitosamente
4. Para manifiestos IIIF externos, verifica que la institución fuente permita CORS

**El banner **View full site** no aparece:**

El banner de *embed* debería aparecer automáticamente:

1. Verifica el parámetro `?embed=true` en la URL
2. Verifica errores de JavaScript en la consola en `embed.js`
3. Confirma que `window.telarLang.embedBanner` está definido:
   ```javascript
   console.log(window.telarLang.embedBanner)
   ```
4. Verifica si el banner existe en el DOM pero está oculto por CSS:
   ```javascript
   document.querySelector('.embed-banner')
   ```

Si el banner falta, verifica que `assets/js/embed.js` se está cargando.

**Problemas de desplazamiento en LMS:**

Telar usa navegación por botones en modo *embed*, no desplazamiento:

1. Verifica que los botones de navegación sean visibles
2. Verifica que los botones sean clicables (no detrás de otros elementos)
3. Prueba la navegación por teclado (teclas de flecha, Re Pág/Av Pág)
4. Asegúrate de que la altura del iframe sea adecuada (mínimo 600px recomendado)

Si los botones no son visibles, verifica que la clase `body.embed-mode` esté aplicada.

**El visor IIIF no se muestra:**

UniversalViewer no carga en el iframe:

1. Verifica si los scripts de UniversalViewer se están cargando:
   ```javascript
   // En la consola del navegador
   typeof UV
   ```
2. Verifica que la URL del manifiesto IIIF sea accesible
3. Verifica restricciones de Content Security Policy (CSP) en el sitio anfitrión
4. Prueba la URL de la historia directamente (no en iframe) para aislar el problema

**El panel de compartir no se abre:**

El botón de compartir debería estar oculto en modo *embed*:

1. Verifica que este es el comportamiento esperado (botón de compartir intencionalmente oculto)
2. Si necesitas compartir en modo *embed*, las personas pueden descartar el banner de *embed* y hacer clic en **View full site**
3. Para comportamiento personalizado, modifica el CSS de `body.embed-mode .share-button`

**El código de inserción no se genera:**

En el panel de compartir, el área de texto del código de inserción está vacía:

**En la página de inicio:**
1. Selecciona una historia del menú desplegable primero
2. Verifica que el JSON de datos de historia esté presente en el código fuente de la página
3. Verifica errores de JavaScript en la consola en `share-panel.js`

**En la página de historia:**
1. Actualiza la página para restablecer el panel de compartir
2. Verifica errores en la consola
3. Verifica que `currentStoryUrl` esté establecido:
   ```javascript
   // Debería estar establecido cuando la página carga
   console.log(window.location.href)
   ```

**Las dimensiones no se actualizan:**

Al cambiar las entradas de ancho/alto:

1. Haz clic en el campo de entrada y escribe el valor
2. Presiona Enter o haz clic fuera del campo para activar la actualización
3. Verifica si el menú desplegable de tamaños predefinidos está interfiriendo (selecciona el tamaño predefinido "Custom")
4. Verifica que JavaScript se esté ejecutando sin errores

## Pruebas

### Lista de verificación de pruebas locales

Antes de publicar:

- [ ] Todas las páginas cargan sin errores
- [ ] Las historias se desplazan con fluidez
- [ ] El visor IIIF amplía correctamente
- [ ] Las miniaturas de objetos se muestran
- [ ] La navegación funciona
- [ ] Los enlaces son correctos
- [ ] Adaptable a pantallas móviles
- [ ] Compatible con múltiples navegadores

### Pruebas de navegador

Prueba en:

- Chrome/Edge (última versión)
- Firefox (última versión)
- Safari (última versión)
- Navegadores móviles (iOS Safari, Chrome Mobile)

### Validación

```bash
# Verifica validez de HTML
bundle exec htmlproofer ./_site --disable-external

# Revisa enlaces rotos
bundle exec jekyll doctor
```

### Pruebas automatizadas

Telar incluye pruebas automatizadas para los scripts de Python y los módulos de JavaScript. Ejecutar las pruebas es opcional para narradores, pero se recomienda para personas que contribuyen al desarrollo del marco.

**Pruebas unitarias de Python:**

```bash
# Ejecuta todas las pruebas unitarias de Python
python3 -m pytest tests/unit/ -v

# Ejecuta con reporte de cobertura
python3 -m pytest tests/unit/ --cov=scripts/telar
```

**Pruebas unitarias de JavaScript:**

```bash
# Ejecuta las pruebas de JavaScript
npm run test:js

# Ejecuta en modo *watch* (re-ejecuta al cambiar archivos)
npm run test:js:watch
```

**Pruebas de extremo a extremo (Playwright):**

Las pruebas E2E requieren un servidor Jekyll ejecutándose y los navegadores de Playwright:

```bash
# Instala navegadores de Playwright (configuración inicial, una sola vez)
playwright install chromium

# Inicia el servidor Jekyll en una terminal
bundle exec jekyll serve --port 4001

# Ejecuta las pruebas E2E en otra terminal
python3 -m pytest tests/e2e/ -v
```

Las pruebas se ejecutan automáticamente en GitHub mediante el flujo de trabajo `telar-tests.yml` cada vez que haces push a main o abres un pull request.

## Publicación

### Preparar para publicación

```bash
# 1. Prueba localmente
bundle exec jekyll serve

# 2. Actualiza _config.yml para producción
baseurl: "/tu-nombre-repo"
url: "https://usuario.github.io"

# 3. Confirma cambios
git add .
git commit -m "Actualizar contenido"

# 4. Empuja a GitHub
git push origin main

# 5. GitHub Actions construye automáticamente
```

## Mejores prácticas

1. **Confirma frecuentemente**: Confirmaciones pequeñas y enfocadas
2. **Prueba localmente primero**: Siempre previsualiza antes de empujar
3. **Usa ramas**: Ramas de características para cambios importantes
4. **Documenta cambios**: Mensajes de confirmación claros
5. **Respalda contenido**: Mantén copias de archivos importantes
6. **Control de versiones**: Rastrea todo el contenido en git
7. *Builds* limpios: ejecuta `jekyll clean` periódicamente

## Obtener ayuda

- [GitHub Issues](https://github.com/UCSB-AMPLab/telar/issues)
- [Documentación Jekyll](https://jekyllrb.com/docs/)
- [Documentación IIIF](https://iiif.io/get-started/)

## Próximos pasos

- [Referencia de GitHub Actions](/guia/desarrolladores/github-actions/)
- [Guía de Personalización](/guia/personalizacion/)
- [Referencia de Configuración](/guia/referencia/configuracion/)

---
layout: default
title: 7.2. Desarrollo
parent: 7. Referencia
grand_parent: Documentación
nav_order: 2
lang: es
permalink: /documentacion/7-referencia/2-desarrollo/
---

## Referencia de desarrollo

Referencia completa para desarrollo local, comandos de construcción y solución de problemas.

## Requisitos previos

### Software requerido

- **Ruby 3.0+**: Runtime de Jekyll
- **Bundler**: Gestión de dependencias de Ruby
- **Python 3.9+**: Generación IIIF y procesamiento CSV
- **Git**: Control de versiones

### Guías de instalación

**macOS (Homebrew):**

```bash
brew install ruby python git
gem install bundler
```

**Ubuntu/Debian:**

```bash
sudo apt-get install ruby-full python3 python3-pip git build-essential
gem install bundler
```

**Windows:**

- Instala [RubyInstaller](https://rubyinstaller.org/)
- Instala [Python](https://www.python.org/downloads/)
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
```

### Configuración

Edita `_config.yml` para desarrollo local:

```yaml
baseurl: ""  # Vacío para desarrollo local
url: "http://localhost:4000"
```

## Comandos de construcción

### Comandos principales

```bash
# Convierte CSVs a JSON
python3 scripts/csv_to_json.py

# Genera tiles IIIF
python3 scripts/generate_iiif.py --source-dir components/images/objects --base-url http://localhost:4000

# Sirve con recarga automática
bundle exec jekyll serve --livereload

# Construir solamente (salida a _site/)
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
# - Agrega imágenes a components/images/objects/

# 3. Reconstruye datos (cuando CSVs cambian)
python3 scripts/csv_to_json.py

# 4. Regenera tiles (cuando imágenes cambian)
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
│   ├── images/objects/      # Imágenes fuente
│   └── texts/               # Archivos Markdown
├── iiif/                    # Tiles IIIF generados
├── scripts/                 # Scripts de construcción
│   ├── csv_to_json.py
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

**Los _tiles_ IIIF no se generan:**

```bash
# Verifica dependencias de Python
pip install -r requirements.txt

# Verifica que existan archivos de imagen
ls -la components/images/objects/

# Verifica mensajes de error
python3 scripts/generate_iiif.py --source-dir components/images/objects
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
7. **Builds limpios**: ejecuta `jekyll clean` de forma periódica

## Obtener ayuda

- [GitHub Issues](https://github.com/UCSB-AMPLab/telar/issues)
- [Documentación Jekyll](https://jekyllrb.com/docs/)
- [Documentación IIIF](https://iiif.io/get-started/)

## Próximos pasos

- [Referencia de GitHub Actions](/documentacion/7-referencia/1-github-actions/)
- [Guía de Personalización](/documentacion/6-personalizacion/)
- [Referencia de Configuración](/documentacion/5-configuracion/)

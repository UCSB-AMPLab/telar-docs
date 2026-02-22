---
layout: docs
title: 7.3. Arquitectura del sistema de demos
parent: 7. Para Desarrolladores
grand_parent: Documentación
nav_order: 3
lang: es
permalink: /guia/desarrolladores/sistema-demos/
---

# Arquitectura del sistema de demos

Documentación técnica para el sistema de obtención e integración de contenido de demostración de Telar.

## Resumen

El sistema de demos proporciona historias de ejemplo pre-construidas (telar-tutorial, paisajes-demo) que se obtienen automáticamente de content.telar.org durante el proceso de compilación y se fusionan con el contenido del usuario.

**Componentes clave:**
- `scripts/fetch_demo_content.py` - Obtiene paquete de demos del servidor remoto
- `scripts/csv_to_json.py` - Fusiona contenido de demos con contenido de usuario
- Directorio `_demo_content/` - Almacenamiento temporal (git ignorado)
- `content.telar.org` - CDN de contenido de demostración

## Diagrama de arquitectura

```
Proceso de Compilación:
1. fetch_demo_content.py se ejecuta (si include_demo_content: true)
   ↓
2. Descarga telar-demo-bundle.json a _demo_content/
   ↓
3. csv_to_json.py se ejecuta
   ↓
4. load_demo_bundle() lee _demo_content/telar-demo-bundle.json
   ↓
5. merge_demo_content() integra demos con contenido de usuario
   ↓
6. Jekyll procesa contenido fusionado
```

## Mecanismo de obtención

### Verificación de configuración

`fetch_demo_content.py` primero lee `_config.yml`:

```python
def should_fetch_demos():
    config = load_config('_config.yml')
    return config.get('story_interface', {}).get('include_demo_content', False)
```

Si `include_demo_content: false` o no está configurado:
- El script elimina el directorio `_demo_content/`
- Sale silenciosamente (no se obtienen demos)
- La compilación continúa normalmente

### Algoritmo de coincidencia de versión

El sistema obtiene el índice `versions.json` para encontrar versiones de demos compatibles:

```json
{
  "versions": ["0.4.0", "0.5.0", "0.6.0"],
  "latest": "0.6.0"
}
```

**Lógica de coincidencia:**
1. Lee `telar.version` de `_config.yml` (ej., "v0.6.0-beta")
2. Elimina sufijo `-beta` y prefijo `v` → "0.6.0"
3. Encuentra la versión disponible más alta ≤ versión del sitio
4. Construye URL de demo: `https://content.telar.org/demos/v{version}/{lang}/telar-demo-bundle.json`

**Escenarios de ejemplo:**

| Versión del Sitio | Versiones Disponibles | Versión Seleccionada |
|--------------|-------------------|------------------|
| v0.6.0-beta | 0.4.0, 0.5.0, 0.6.0 | 0.6.0 |
| v0.5.5 | 0.4.0, 0.5.0, 0.6.0 | 0.5.0 |
| v0.7.0 | 0.4.0, 0.5.0, 0.6.0 | 0.6.0 |
| v0.3.0 | 0.4.0, 0.5.0, 0.6.0 | Ninguna (demasiado vieja) |

### Selección de idioma

El idioma se determina por la configuración `telar_language`:

```python
def get_demo_language():
    config = load_config('_config.yml')
    return config.get('telar_language', 'en')
```

Mapea a URLs de demos:
- `en` → `/demos/v0.6.0/en/telar-demo-bundle.json`
- `es` → `/demos/v0.6.0/es/telar-demo-bundle.json`

### Obtención HTTP

```python
def fetch_demo_bundle(url):
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        log_error(f"Failed to fetch demos: {e}")
        return None
```

**Manejo de errores:**
- Fallos de red: El script sale graciosamente, la compilación continúa
- Errores 404: El script registra advertencia, la compilación continúa
- Tiempo de espera (30s): El script sale graciosamente
- JSON inválido: El script registra error, la compilación continúa

Todos los errores son no fatales. El sitio se compila sin demos si la obtención falla.

## Estructura del paquete

### Formato de paquete único

A partir de v0.6.0, las demos se entregan como un solo archivo JSON:

```json
{
  "version": "0.6.0",
  "language": "en",
  "generated": "2025-11-28T10:00:00Z",
  "projects": [ ... ],
  "objects": [ ... ],
  "stories": {
    "telar-tutorial": [ ... ],
    "paisajes-demo": [ ... ]
  },
  "glossary": [ ... ]
}
```

### Array de proyectos

```json
"projects": [
  {
    "number": 1,
    "story_id": "telar-tutorial",
    "title": "Telar Tutorial",
    "subtitle": "Interactive Guide to Telar Features",
    "byline": "Start here to learn Telar"
  },
  {
    "number": 2,
    "story_id": "paisajes-demo",
    "title": "Paisajes Coloniales",
    "subtitle": "Colonial Cartography Excerpt",
    "byline": "Scholarly narrative example"
  }
]
```

### Array de objetos

```json
"objects": [
  {
    "object_id": "demo-leviathan",
    "title": "Leviathan Frontispiece (1651)",
    "iiif_manifest": "",
    "iiif_source_url": "https://content.telar.org/iiif/demo-leviathan/info.json",
    "creator": "Abraham Bosse",
    "period": "1651",
    "credit": "Public Domain"
  }
]
```

**Auto-Población IIIF:**
- Si `iiif_manifest` está vacío y el objeto es autoalojado
- `iiif_source_url` se puebla con URL de content.telar.org
- `csv_to_json.py` procesa esto igual que objetos de usuario

### Objeto de historias

```json
"stories": {
  "telar-tutorial": [
    {
      "step": 1,
      "object": "demo-tutorial-iiif",
      "x": 0,
      "y": 0,
      "zoom": 0,
      "question": "What is IIIF?",
      "answer": "...",
      "layer1_button": "Learn More",
      "layer1_file": "iiif-intro",
      "layer1_content": "# What is IIIF?\n\nIIIF (pronounced..."
    }
  ]
}
```

**Inclusión de Contenido:**
- `layer1_content`, `layer2_content` incluyen markdown completo
- No hay referencias de archivo para resolver
- El contenido está pre-procesado y listo para fusionar

### Array de glosario

```json
"glossary": [
  {
    "term": "iiif",
    "title": "IIIF",
    "content": "# IIIF\n\nInternational Image Interoperability Framework..."
  }
]
```

## Fusión de contenido

### Punto de integración

`csv_to_json.py` maneja la fusión:

```python
def main():
    # Cargar contenido de usuario
    user_projects = process_project_csv()
    user_objects = process_objects_csv()
    user_stories = process_story_csvs()

    # Cargar y fusionar contenido de demos
    demo_bundle = load_demo_bundle()
    if demo_bundle:
        merge_demo_content(demo_bundle, user_projects, user_objects, user_stories)

    # Escribir resultados fusionados
    write_json_files(user_projects, user_objects, user_stories)
```

### Proceso de fusión

**Proyectos:**
```python
def merge_projects(user_projects, demo_projects):
    # Proyectos de usuario primero, luego demos
    merged = user_projects + demo_projects
    # Renumerar si es necesario
    for i, project in enumerate(merged, 1):
        project['number'] = i
    return merged
```

**Objetos:**
```python
def merge_objects(user_objects, demo_objects):
    # Concatenación simple, object_ids únicos garantizados
    return user_objects + demo_objects
```

**Historias:**
```python
def merge_stories(user_stories, demo_stories):
    # Historias de demos escritas como archivos JSON separados
    for story_id, steps in demo_stories.items():
        write_story_json(f"{story_id}.json", steps)
```

**Glosario:**
```python
def merge_glossary(demo_glossary):
    # Escrito en _data/demo-glossary.json (no components/)
    write_json('_data/demo-glossary.json', demo_glossary)
```

### Procesamiento de widgets

El contenido de demos pasa por el pipeline de procesamiento completo:

1. **Widgets**: Sintaxis de acordeón, pestañas, carrusel convertida
2. **Dimensionamiento de imágenes**: Imágenes de panel procesadas para dimensiones
3. **Markdown**: Conversión completa de markdown a HTML
4. **Enlaces de glosario**: Sintaxis `[term:glossary-term]` convertida

Esto sucede en `csv_to_json.py` después de la fusión.

### Etiquetas de demo

El contenido de demos se marca con la bandera `demo: true`:

```json
{
  "step": 1,
  "object": "demo-tutorial-iiif",
  "demo": true,
  ...
}
```

Las plantillas verifican esta bandera para mostrar etiquetas:

```liquid
{% raw %}{% if step.demo %}
  <span class="demo-badge">{{ lang.demo.panel_badge }}</span>
{% endif %}{% endraw %}
```

## Sistema de archivos

### Estructura de directorios

```
_demo_content/               # Git ignorado
└── telar-demo-bundle.json   # Paquete descargado

_data/
├── demo-glossary.json       # Glosario de demos (generado)
├── objects.json             # Objetos fusionados
├── project.json             # Proyectos fusionados
├── telar-tutorial.json      # Historia de demo
└── paisajes-demo.json       # Historia de demo
```

### Reglas de Gitignore

```gitignore
# Contenido de demos (efímero)
_demo_content/

# Archivos de glosario de demos
components/texts/glossary/_demo_*
_data/demo-glossary.json
```

El contenido de demos nunca entra en control de versiones.

## Integración con GitHub Actions

### Paso del flujo de trabajo

`.github/workflows/build.yml`:

```yaml
- name: Fetch demo content (if enabled)
  run: python3 scripts/fetch_demo_content.py
  continue-on-error: true

- name: Process CSV to JSON
  run: python3 scripts/csv_to_json.py
```

**Puntos clave:**
- Se ejecuta antes de `csv_to_json.py`
- `continue-on-error: true` - La compilación continúa si la obtención falla
- Contenido de demos listo para fusión cuando comienza el procesamiento CSV

## Manejo de errores

### Degradación elegante

Todos los errores de obtención de demos son no fatales:

```python
try:
    bundle = fetch_demo_bundle(url)
    if bundle:
        save_bundle(bundle)
except Exception as e:
    logger.warning(f"Demo fetch failed: {e}")
    logger.info("Building without demo content")
    # No raise, no sys.exit()
```

El sitio se compila exitosamente sin demos.

### Errores comunes

| Error | Causa | Comportamiento |
|-------|-------|----------|
| Tiempo de espera de red | content.telar.org inalcanzable | La compilación continúa, sin demos |
| 404 No Encontrado | Versión no disponible | La compilación continúa, sin demos |
| JSON inválido | Paquete mal formado | La compilación continúa, sin demos |
| Versión no coincide | Sin versión compatible | La compilación continúa, sin demos |
| Sintaxis de config | YAML inválido | El script puede fallar, la compilación falla |

Solo los errores de sintaxis de configuración son fatales.

## Depuración

### Habilitar registro detallado

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

### Verificar estado de obtención

```bash
# Ejecutar obtención manualmente
python3 scripts/fetch_demo_content.py

# Verificar si el paquete se descargó
ls -lh _demo_content/
cat _demo_content/telar-demo-bundle.json | python3 -m json.tool | head
```

### Verificar fusión

```bash
# Verificar contenido fusionado
cat _data/project.json | grep -i demo
cat _data/objects.json | grep -i demo
ls -1 _data/*demo*.json
```

### Probar coincidencia de versión

```python
from scripts.fetch_demo_content import find_compatible_version

site_version = "0.6.0"
available = ["0.4.0", "0.5.0", "0.6.0"]
selected = find_compatible_version(site_version, available)
print(f"Selected: {selected}")  # Debería ser 0.6.0
```

## Rendimiento

### Tamaño del paquete

Tamaños típicos de paquete:
- Paquete en inglés: ~200-300 KB (comprimido)
- Paquete en español: ~200-300 KB (comprimido)

### Tiempo de obtención

- Obtención de red: 1-3 segundos (buena conexión)
- Análisis JSON: <100ms
- Sobrecarga total: 1-5 segundos agregados a la compilación

### Almacenamiento en caché

Actualmente no se implementa almacenamiento en caché. Cada compilación obtiene contenido fresco.

**Consideración futura:** Caché con TTL para desarrollo local.

## Seguridad

### Imposición de HTTPS

Todas las URLs de demos usan HTTPS:

```python
DEMO_BASE_URL = "https://content.telar.org"  # No http://
```

### Validación de contenido

Validación básica en el paquete obtenido:

```python
def validate_bundle(bundle):
    required_keys = ['version', 'language', 'projects', 'objects', 'stories']
    return all(key in bundle for key in required_keys)
```

### Sin ejecución de código

El contenido de demos es solo datos (JSON). No hay código ejecutable en los paquetes.

## Solución de problemas

### Las demos no aparecen

**Verificar configuración:**
```bash
grep include_demo_content _config.yml
# Debería mostrar: include_demo_content: true
```

**Verificar log de obtención:**
```bash
python3 scripts/fetch_demo_content.py
# Buscar errores o advertencias
```

**Verificar que el paquete existe:**
```bash
ls _demo_content/telar-demo-bundle.json
# Debería existir si la obtención tuvo éxito
```

### Versión no coincide

**Verificar versions.json:**
```bash
curl https://content.telar.org/versions.json
# Comparar con la versión de tu sitio
```

**Verificar versión seleccionada:**
```bash
python3 scripts/fetch_demo_content.py --verbose
# Muestra lógica de selección de versión
```

### Errores de red

**Probar conectividad:**
```bash
curl -I https://content.telar.org/
# Debería devolver 200 OK
```

**Verificar firewall:**
- GitHub Actions puede bloquear HTTPS saliente
- Verificar logs de Actions para errores de conexión

## Documentación relacionada

- [Contenido de Demostración (Guía de Usuario)](/guia/iiif/contenido-demostracion/) - Documentación para usuarios
- [Referencia de GitHub Actions](/guia/desarrolladores/github-actions/) - Detalles del flujo de trabajo de compilación

---

**Nuevo en v0.6.0**: Obtención automatizada de demos con coincidencia de versión y soporte de idioma.

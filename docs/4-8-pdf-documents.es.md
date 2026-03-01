---
layout: docs
title: "4.8. Documentos PDF"
parent: "4. Tu contenido"
grand_parent: Documentación
nav_order: 8
lang: es
permalink: /guia/tu-contenido/documentos-pdf/
---

# Documentos PDF

Telar puede mostrar documentos PDF de múltiples páginas — libros, registros legales, manuscritos, mapas — como objetos ampliables de alta resolución. Cada página de un PDF se convierte en una imagen con zoom profundo, igual que una fotografía o un escaneo.

Esto permite construir historias que amplían páginas y regiones específicas de un documento, guiando al público a través de detalles que de otra manera podrían pasar desapercibidos.

## Agregar un PDF

Agregar un PDF funciona de la misma manera que agregar una imagen. Coloca el archivo en `telar-content/objects/` con un nombre que coincida con el `object_id` en tu hoja de cálculo.

Por ejemplo, si tu hoja de cálculo tiene un objeto con `object_id` = `leyes-nuevas`, nombra tu archivo `leyes-nuevas.pdf`.

**Desde la interfaz web de GitHub:**

1. Navega a `telar-content/objects/` en tu repositorio
2. Haz clic en **Add file** > **Upload files**
3. Sube tu archivo PDF
4. Asegúrate de que el nombre del archivo (sin `.pdf`) coincida con tu `object_id`
5. Confirma los cambios

**Para desarrollo local:**

1. Coloca tu PDF en `telar-content/objects/`
2. Genera las teselas (*tiles*) IIIF:
   ```bash
   python3 scripts/generate_iiif.py --base-url http://localhost:4001
   ```

{: .note }
> Telar renderiza cada página del PDF como una imagen de alta resolución durante el proceso de *build*. Un PDF de 40 páginas producirá 40 imágenes de página separadas, cada una con su propio conjunto de teselas de zoom. El tiempo de *build* aumenta con el número de páginas.

## Cómo funciona

Cuando agregas un PDF y construyes tu sitio:

1. Telar renderiza cada página como una imagen JPEG de alta resolución usando PyMuPDF
2. Cada imagen de página se divide en teselas a múltiples niveles de zoom (igual que una fotografía)
3. Se genera un manifiesto IIIF para cada página individual, más un manifiesto de múltiples páginas para el documento completo
4. En las páginas de objetos, el visor muestra el documento completo con controles de navegación por páginas
5. En las historias, cada paso puede hacer referencia a una página específica

## Páginas de objetos vs. historias

Los PDF se comportan de manera diferente según el contexto:

- **Páginas de objetos** (`/objects/leyes-nuevas/`) muestran el documento completo. El visor incluye controles de navegación — flechas de avance y retroceso y un selector de página — para que quienes visitan puedan recorrer todas las páginas.

- **Historias** muestran una página a la vez. Cada paso de la historia especifica qué página mostrar usando la columna `pagina` en tu hoja de cálculo. El visor amplía las coordenadas que configuraste para esa página, igual que lo hace con una fotografía.

## Usar PDF en historias

Para hacer referencia a una página específica de un PDF en un paso de la historia, agrega una columna `pagina` a tu hoja de cálculo. El valor es el número de página (comenzando desde 1).

```csv
paso,objeto,x,y,zoom,pagina,pregunta,respuesta
1,leyes-nuevas,0.5,0.5,1,1,¿Qué es este documento?,La Recopilación de leyes de los reynos de las Indias codificó el derecho colonial español.
2,leyes-nuevas,0.4,0.15,2.5,10,Una disposición clave,Esta página detalla el marco legal que gobernaba la administración colonial.
3,textil-001,0.5,0.3,0.8,,¿Qué es este textil?,Un fragmento colonial que muestra técnicas complejas de tejido.
```

- Los pasos 1 y 2 hacen referencia a las páginas 1 y 10 del PDF `leyes-nuevas`
- El paso 3 hace referencia a una imagen regular (`textil-001`) sin valor de `pagina` — la columna se deja vacía para objetos de una sola imagen

{: .tip }
> **Encontrar coordenadas para una página específica.** Navega a la página de objeto de tu PDF (`/objects/leyes-nuevas/`). Usa los controles de navegación para ir a la página que deseas. Luego usa el selector de coordenadas — incluye automáticamente el número de página actual en los valores copiados.

### La columna `pagina`

- **Los números de página comienzan en 1** (la página 1 es la primera página del PDF)
- **Debe ser un número entero positivo** — valores decimales o negativos producen una advertencia
- **Dejar vacío para objetos de una sola imagen** — Telar ignora los valores vacíos de `pagina`
- **Nombres de columna bilingües**: `page` (inglés) o `pagina` / `página` (español)

## Tipos de PDF compatibles

Telar renderiza PDF usando PyMuPDF, que maneja la mayoría de los archivos PDF estándar:

- **Documentos escaneados** — Páginas fotografiadas o escaneadas (el tipo más común en la investigación histórica)
- **PDF nativos** — Documentos con texto incrustado y gráficos vectoriales
- **PDF mixtos** — Documentos que combinan imágenes escaneadas y texto nativo

{: .note }
> La calidad del renderizado depende del documento fuente. Las páginas escaneadas a 300 DPI o más producen los mejores resultados de zoom profundo. Los escaneos de baja resolución pueden verse borrosos al ampliar.

## Consideraciones de tamaño

Los PDF producen más datos que las imágenes individuales porque cada página genera su propia pirámide de teselas:

- Un PDF de 10 páginas produce aproximadamente 10 veces las teselas de una sola imagen
- Un documento de 100 páginas puede aumentar significativamente el tiempo de *build* y el tamaño del repositorio
- Considera usar solo las páginas que necesitas en lugar de incluir el documento completo

{: .note }
> **Si tu sitio está alojado en GitHub Pages** (el caso por defecto en la mayoría de sitios Telar), ten en cuenta que GitHub no permite archivos individuales de más de 100 MB, y recomienda mantener el tamaño total del repositorio por debajo de 1 GB. Un PDF grande más todas las teselas de zoom que genera puede sumar rápidamente.

{: .tip }
> **Para documentos muy grandes** (más de 100 páginas), verifica si una biblioteca o archivo ya aloja una versión digitalizada con un manifiesto IIIF. Si es así, puedes usar la URL del manifiesto en la columna `source_url` en lugar de autoalojar el PDF. Consulta [IIIF externo](/guia/tu-contenido/iiif-externo/) para saber cómo encontrar y usar estos manifiestos.

## Solución de problemas

### El PDF no carga

- Verifica que el archivo exista en `telar-content/objects/`
- Asegúrate de que el nombre del archivo (sin `.pdf`) coincida con el `object_id` en tu hoja de cálculo
- Verifica que el objeto tenga la columna `source_url` vacía
- Asegúrate de que las teselas IIIF se hayan generado (verifica que exista `iiif/objects/{object-id}/`)

### Se muestra la página incorrecta en la historia

- Verifica el valor de `pagina` en tu hoja de cálculo — debe ser un número entero positivo
- Los números de página comienzan en 1, no en 0
- Usa el selector de coordenadas en la página del objeto para verificar el número de página correcto

### Errores de *build*

- Asegúrate de que PyMuPDF esté instalado (`pip install pymupdf`)
- Si PyMuPDF no está disponible, Telar omite los archivos PDF con un mensaje informativo — los demás objetos se procesan normalmente

## Ver también

- [Imágenes autoalojadas](/guia/tu-contenido/imagenes-autoalojadas/) — Agregar fotografías y escaneos
- [Objetos](/guia/tu-contenido/objetos/) — Definir objetos en tu hoja de cálculo
- [Historias y paneles](/guia/tu-contenido/historias-y-paneles/) — Construir pasos de historias
- [Columnas de historias](/guia/tus-datos/csv-historias/) — Referencia completa de columnas incluyendo la columna `pagina`
- [IIIF externo](/guia/tu-contenido/iiif-externo/) — Usar manifiestos IIIF de bibliotecas y archivos

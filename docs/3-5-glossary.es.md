---
layout: docs
title: 3.5. Glosario
parent: 3. Estructura de contenido
grand_parent: Documentación
nav_order: 5
lang: es
permalink: /guia/estructura-de-contenido/glosario/
---

# Glosario

El glosario te permite definir términos que las personas pueden consultar sin abandonar una historia. Cuando alguien hace clic en un enlace de glosario, la definición aparece en un panel lateral deslizante.

## Crear un glosario

Hay dos formas de definir términos de glosario. El formato CSV (nuevo en v0.8.0) es el recomendado para la mayoría de los proyectos.

### Formato CSV (recomendado)

Agrega un archivo `glossary.csv` a `components/structures/`:

```csv
term_id,title,definition,related_terms
loom,Telar,Un dispositivo usado para tejer telas y tapices.,warp
warp,Urdimbre,"El conjunto de hilos longitudinales en un telar, a través de los cuales se teje la trama.",loom
encomienda,Encomienda,"Un sistema de trabajo en la América colonial española, que otorgaba a los colonizadores autoridad sobre trabajadores indígenas.",
```

Cada fila define un término:

- **`term_id`** — Identificador único usado en los enlaces (minúsculas, se recomiendan guiones)
- **`title`** — Nombre visible en el panel del glosario
- **`definition`** — El texto de la definición (admite markdown básico)
- **`related_terms`** — Lista separada por comas de otros valores `term_id` para referencias cruzadas

El formato CSV funciona con Google Sheets — la pestaña de glosario se obtiene automáticamente como los demás CSV. Los nombres de columnas pueden estar en inglés o español (consulta [Referencia CSV: Historias y Glosario](/guia/referencia/csv-historias-glosario/#glossary-csv-aliases) para los alias).

### Formato markdown (legado)

Archivos markdown individuales en `components/texts/glossary/`:

```markdown
---
term_id: periodo-colonial
title: "Periodo Colonial"
related_terms: encomienda,virreinato
---

El Periodo Colonial en las Américas comenzó con la llegada de
los colonizadores europeos a finales del siglo XV...
```

Cada archivo define un término. El cuerpo del archivo es la definición.

{: .note }
> Si existen tanto un glosario CSV como archivos markdown de glosario, Telar usa el CSV e ignora los archivos markdown (con una advertencia en la *build*).

## Enlazar a términos del glosario

Enlaza a términos del glosario desde los paneles de las historias usando sintaxis de doble corchete:

### Forma abreviada

Usa el `title` del término como texto del enlace:

```markdown
El [[loom]] era central para la producción textil.
```

Se renderiza como: El <u>Telar</u> era central para la producción textil.

### Texto personalizado

Usa un separador de barra vertical para especificar un texto de enlace diferente:

```markdown
El [[loom|dispositivo de tejido]] era central para la producción textil.
```

Se renderiza como: El <u>dispositivo de tejido</u> era central para la producción textil.

### Dónde funcionan los enlaces

Los autoenlaces de glosario funcionan en:

- Contenido de paneles de historias (los tres métodos: texto directo, markdown pegado, archivos)
- Páginas personalizadas

Si un `term_id` no se encuentra en el glosario, un ícono de advertencia y un mensaje de error aparecen en la salida de la *build* y en el panel de la historia.

## Experiencia de visualización

Cuando alguien hace clic en un enlace de glosario:

1. Un panel deslizante aparece desde el lado de la pantalla
2. El panel muestra el **título** y la **definición** del término
3. Los **términos relacionados** aparecen como enlaces adicionales en la parte inferior
4. La persona puede navegar entre términos relacionados sin cerrar el panel
5. Al hacer clic fuera del panel o presionar el botón de cierre, el panel se descarta

La persona permanece en el paso actual de la historia durante todo el proceso — las consultas al glosario no interrumpen el flujo narrativo.

![Página del glosario mostrando listado alfabético de términos](/images/glossary-page.png)

## Consejos

- **Mantén las definiciones concisas** — Las personas las leen en medio de una historia. Una o dos oraciones es lo ideal; guarda las explicaciones extensas para los paneles de las historias.
- **Usa términos relacionados** para construir una red de referencias cruzadas. Esto ayuda a las personas a explorar conceptos conectados.
- **Prefija los términos de demostración** con `demo-` (ej., `demo-loom`) para etiquetarlos como contenido de demostración.
- **Prueba tus enlaces** compilando el sitio y revisando las advertencias de glosario en la salida de la *build*.

## Véase también

- [Referencia CSV: Historias y Glosario](/guia/referencia/csv-historias-glosario/) — Referencia completa de columnas del CSV de glosario y alias
- [Historias y Paneles](/guia/estructura-de-contenido/historias-paneles/) — Dónde se usan los enlaces de glosario
- [Guía de Sintaxis Markdown](/guia/referencia/sintaxis-markdown/) — Formato para definiciones

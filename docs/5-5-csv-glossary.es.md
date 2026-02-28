---
layout: docs
title: "5.5. Columnas del glosario"
parent: "5. Tus datos"
grand_parent: Documentación
nav_order: 5
lang: es
permalink: /guia/tus-datos/csv-glosario/
---

# Columnas del glosario

Referencia completa de las columnas de `glossary.csv` con soporte bilingüe de nombres de columnas. Para la normalización de columnas y soporte de encabezados dobles, consulta [Columnas del proyecto](/guia/tus-datos/csv-proyecto/#descripcion-general).

## CSV de glosario (glossary.csv)

Define términos de glosario que se pueden enlazar desde los paneles de las historias usando la sintaxis `[[term_id]]`.

**Ubicación**: `components/structures/glossary.csv`

**Nuevo en v0.8.0.** El formato CSV es el método preferido para los términos de glosario. Los archivos markdown heredados en `components/texts/glossary/` siguen siendo compatibles, pero el CSV tiene precedencia si ambos existen.

### Columnas

| Inglés | Español | Requerido | Descripción |
|--------|---------|-----------|-------------|
| `term_id` | `id_termino` | Sí | Identificador único del término (se usa en la sintaxis de enlaces) |
| `title` | `titulo` | Sí | Título visible del término |
| `definition` | `definicion` | No | Texto de la definición del término |
| `related_terms` | `terminos_relacionados` | No | IDs de términos relacionados, separados por comas |

### Ejemplo

**Inglés:**
```csv
term_id,title,definition,related_terms
loom,Loom,A device used to weave cloth and tapestry.,warp
warp,Warp,"The set of lengthwise yarns on a loom, through which the weft is woven.",loom
encomienda,Encomienda,"A system of labor in colonial Spanish America, granting colonists authority over indigenous workers.",
```

**Español:**
```csv
id_termino,titulo,definicion,terminos_relacionados
telar,Telar,Un dispositivo utilizado para tejer tela y tapices.,urdimbre
urdimbre,Urdimbre,"El conjunto de hilos longitudinales en un telar, a través de los cuales se teje la trama.",telar
encomienda,Encomienda,"Un sistema de trabajo en la América colonial española, que otorgaba a los colonos autoridad sobre los trabajadores indígenas.",
```

### Notas de los campos

#### term_id / id_termino
- Único entre todos los términos del glosario
- Se usa en la sintaxis de enlace en línea: `[[term_id]]` o `[[term_id|texto visible]]`
- Formato: minúsculas, se recomiendan guiones
- Los términos con prefijo `demo-` se marcan como contenido de demostración

#### title / titulo
- El nombre visible que se muestra en el panel del glosario y como texto del enlace
- Al usar la forma abreviada `[[term_id]]`, el título se usa automáticamente como texto del enlace

#### definition / definicion
- El texto de la definición mostrado en la entrada del glosario
- Admite formato markdown básico

#### related_terms / terminos_relacionados
- Lista separada por comas de otros valores `term_id`
- Se usa para referencias cruzadas entre entradas del glosario

### Sintaxis de enlace en línea

Enlaza a términos del glosario desde los paneles de las historias usando sintaxis de doble corchete:

**Forma abreviada** — usa el título del término como texto del enlace:
```
El [[loom]] era central para la producción textil.
```

**Con texto visible personalizado** — usa un separador de barra vertical:
```
El [[loom|dispositivo de tejido]] era central para la producción textil.
```

Si el `term_id` no se encuentra en el glosario, un ícono de advertencia y un mensaje de error aparecen en la salida de la *build* y en el panel de la historia.

### Alias del CSV de glosario

| Normalizado | Acepta |
|------------|--------|
| `term_id` | `term_id`, `id_termino`, `id_término` |
| `title` | `title`, `titulo`, `título` |
| `definition` | `definition`, `definicion`, `definición` |
| `related_terms` | `related_terms`, `terminos_relacionados`, `términos_relacionados` |

### CSV vs. glosario en markdown

| Aspecto | CSV (preferido) | Markdown (heredado) |
|---------|----------------|-------------------|
| Ubicación | `components/structures/glossary.csv` | `components/texts/glossary/*.md` |
| Formato | Filas con columnas | Archivos individuales con frontmatter YAML |
| Encabezados bilingües | Sí (mediante alias de columnas) | No |
| Google Sheets | Sí (se obtiene como los demás CSV) | No |

Si existen tanto un CSV como un glosario en markdown, se usa el CSV y se ignoran los archivos markdown (con una advertencia en la *build*).

## Validación

**Advertencias de glosario**:
- `term_id` o `title` faltantes (se omite la fila)
- Enlace de glosario `[[term_id]]` hace referencia a un término inexistente

## Véase también

- [Columnas del proyecto](/guia/tus-datos/csv-proyecto/) — Columnas de project.csv
- [Columnas de objetos](/guia/tus-datos/csv-objetos/) — Columnas de objects.csv
- [Columnas de historias](/guia/tus-datos/csv-historias/) — Columnas de los CSV de historia
- [Glosario](/guia/funciones/glosario/) — Configuración del glosario y autoenlaces

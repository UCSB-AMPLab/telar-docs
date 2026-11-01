---
title: Crea y enlaza entradas del glosario
url: /guia/el-compositor/glosario/
translationKey: docs-the-compositor-glossary
type: guide
docs_draft: true
docs_section: compositor
---

# Crea y enlaza entradas del glosario {#crea-y-enlaza-entradas-del-glosario}

Usa el glosario para definiciones y contexto que puedan servir en varios lugares. Cada entrada tiene un ID para los enlaces, un título visible, un tipo y una definición.

## Agrega una entrada {#agrega-una-entrada}

1. Abre **Glosario** en la navegación principal.
2. Si eres responsable del sitio, elige **+ Nuevo término**.
3. Escribe un título claro y una definición que se entienda por sí sola.
4. Elige el tipo: palabra clave, fuente primaria, persona o entidad, o lugar.
5. Revisa la vista previa para lectores.

La persona responsable agrega y elimina entradas y cambia sus IDs. Los demás integrantes pueden trabajar en el contenido de las entradas existentes. Si no aparece el control de creación, pídele a la persona responsable que agregue el término.

{{< media id="glossary" >}}

## Enlázala desde una historia {#enlázala-desde-una-historia}

En el editor de texto de un panel, usa **Insertar enlace de glosario** y busca el término. Elige un texto personalizado si la frase requiere otra expresión.

También puedes escribir el enlace:

```text
[[khipu]]
[[khipu|cuerdas anudadas]]
```

Antes de la barra vertical va el ID, no el título visible. Usa el ID de la entrada que creaste. Revisa el enlace en la vista previa y después en el sitio publicado.

## Revisa dónde se usa {#revisa-dónde-se-usa}

La lista de usos muestra referencias en historias, páginas y otros términos. Abre cada referencia para revisar su contexto antes de cambiar una definición de la que dependen varios pasajes.

Una definición breve debe resolver la duda inmediata del lector. Lleva una discusión extensa sobre una fuente al panel de ese paso y enlaza el glosario cuando necesites contexto compartido.

## Cambia un ID o un tipo con cuidado {#cambia-un-id-o-un-tipo-con-cuidado}

La persona responsable puede cambiar el ID. El Compositor actualiza sus enlaces internos, pero la dirección pública cambia al publicar. Los enlaces compartidos fuera del proyecto seguirán apuntando a la dirección anterior.

**Editar tipos** permite agregar categorías propias con un ID, una etiqueta para el panel y un encabezado para la página del glosario. Escribe esas etiquetas en el idioma de la exhibición.

Eliminar una entrada deja sus referencias sin resolver. Revisa primero dónde se usa y reemplaza o retira los enlaces antes de publicar.

**Comprueba el resultado:** abre el término desde un panel, revisa el texto visible y vuelve al mismo paso. Sigue con [el inicio y las páginas](/guia/el-compositor/paginas/).

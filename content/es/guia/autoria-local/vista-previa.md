---
title: Genera y revisa el sitio local
url: /guia/autoria-local/vista-previa/
translationKey: docs-local-authoring-preview
type: guide
docs_draft: true
docs_section: local
---

# Genera y revisa el sitio local {#genera-y-revisa-el-sitio-local}

El script local prepara el contenido antes de iniciar Jekyll. El observador de archivos de Jekyll no vuelve a ejecutar todo el procesamiento previo.

## Vuelve a generar después de editar contenido {#vuelve-a-generar-después-de-editar-contenido}

Detén el servidor con Ctrl+C y ejecuta:

```bash
python3 scripts/build_local_site.py
```

Después de editar CSV hay que convertir los datos y generar las colecciones. Después de agregar o reemplazar una imagen o PDF hay que generar las teselas IIIF. El script realiza estas etapas.

Si no cambiaron las imágenes ni la hoja de Google Sheets:

```bash
python3 scripts/build_local_site.py --skip-iiif --skip-fetch
```

No omitas una etapa cuyos insumos cambiaron. Jekyll puede actualizar parte del resultado al editar Markdown o estilos, pero vuelve a usar el script para revisar el sitio completo.

## Comprueba la fuente de cada paso {#comprueba-la-fuente-de-cada-paso}

Abre la galería, la página del objeto y la historia. En el ejemplo del khipu, las tres deben mostrar el khipu. Revisa encuadre, texto alternativo, créditos, paneles y enlaces del glosario.

Prueba una ventana más pequeña y la navegación con teclado. Usa [la revisión con lectores](/guia/planear/revision/) para evaluar también la narrativa.

{{< media id="coordinates" >}}

## Prueba las historias privadas por separado {#prueba-las-historias-privadas-por-separado}

El servidor de desarrollo muestra las historias privadas sin cifrar. Como regenera las páginas continuamente, su resultado no conserva el cifrado.

Para probar el bloqueo, detén Jekyll. Configura temporalmente `baseurl: ""` para que el servidor estático sirva el resultado desde su raíz y ejecuta:

```bash
python3 scripts/build_local_site.py --port 4003 --build-only
python3 -m http.server 4003 --directory _site
```

Restaura la ruta de producción después de esta prueba. Este build ejecuta el cifrado posterior a la generación. Abre la historia en el servidor estático y prueba las vistas bloqueada y desbloqueada. Trata la vista previa de desarrollo como material de trabajo local.

## Revisa la etapa que informa el error {#revisa-la-etapa-que-informa-el-error}

Una imagen ausente puede deberse a un ID distinto, una fuente inaccesible o una falla al generar teselas. Una historia ausente puede deberse a que su ID y el archivo tienen nombres diferentes. La terminal ayuda a identificar la etapa.

Corrige la fuente y vuelve a generar. Evita editar JSON o HTML generados para ocultar el problema.

Sigue con [la publicación y el mantenimiento](/guia/autoria-local/publicar/).

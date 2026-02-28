---
layout: docs
title: 2.1. Configuración manual
parent: 2. Configura tu sitio
grand_parent: Documentación
nav_order: 1
lang: es
permalink: /guia/configuracion/configuracion-manual/
---

# Configuración manual

Construye una exposición completa de Telar desde tu navegador usando GitHub y Google Sheets. No necesitas instalar nada.

Vas a necesitar:
- Una [cuenta de GitHub](https://github.com/join) (gratis)
- Una [cuenta de Google](https://accounts.google.com/) para Google Sheets (gratis)

---

## Parte 1: Configura la parte técnica

Esta parte puede parecer intimidante, pero solo tienes que hacerla una vez. Una vez que todo esté configurado, no tendrás que volver aquí — todo lo demás es trabajo creativo en tu hoja de cálculo.

### Crea tu repositorio

Un repositorio es el espacio de tu proyecto en GitHub — almacena tus imágenes y archivos de configuración.

1. Visita la [plantilla de Telar](https://github.com/UCSB-AMPLab/telar)
2. Haz clic en el botón verde **Use this template**
3. Selecciona **Create a new repository**
4. Escoge un nombre para tu repositorio — **usa solo letras minúsculas y evita espacios (los guiones están bien)** — será parte de la dirección web de tu sitio
5. Haz clic en **Create repository**

![Captura de pantalla de GitHub: botón Use this template](/images/use-this-template.png)

### Habilita GitHub Pages

GitHub Pages convierte tu repositorio en un sitio web en vivo de forma gratuita.

1. En tu repositorio, ve a **Settings** → **Pages**
2. En **Source**, selecciona **GitHub Actions**
3. Haz clic en **Save**

![Configuración de GitHub Pages con GitHub Actions](/images/github-actions.gif)

### Duplica la plantilla de Google Sheets

Tu hoja de cálculo de Google Sheets es donde administras todo el contenido — objetos, historias y textos.

1. Ve a [https://bit.ly/telar-template](https://bit.ly/telar-template)
2. Haz clic en **File** → **Make a copy**
3. Guárdala en tu Google Drive con un nombre descriptivo (ej., "Mi exposición Telar")

### Comparte y publica tu hoja

Tu hoja de cálculo necesita dos tipos de acceso para que Telar pueda leerla durante la compilación.

**Comparte tu hoja:**

1. Haz clic en el botón **Share** en Google Sheets
2. Establece el acceso a "Anyone with the link" con permisos de **Viewer**
3. Copia la URL compartida

**Publica tu hoja:**

1. Ve a **File** → **Share** → **Publish to web**
2. Haz clic en **Publish**
3. Copia la URL publicada

### Configura tu sitio

Edita el archivo `_config.yml` en tu repositorio para conectar todo:

1. Navega a `_config.yml` y haz clic en el ícono de lápiz para editar

2. **Configuración del sitio** — completa el nombre y la descripción de tu sitio:

   ```yaml
   title: "Mi exposición"
   description: "Una narrativa visual sobre..."
   author: Tu Nombre
   ```

3. **Dirección web** — establece la URL de tu sitio:

   ```yaml
   url: "https://tuusuariogithub.github.io"
   baseurl: "/nombre-de-tu-repositorio"
   ```

   Tu sitio estará disponible en `https://tuusuariogithub.github.io/nombre-de-tu-repositorio`.

   {: .warning }
   > Es muy importante que tu baseurl coincida exactamente con el nombre de tu repositorio. Baseurl debe estar completamente en minúsculas, así que si le pusiste mayúsculas al nombre de tu repositorio, ve y cámbialo ahora.

4. **Google Sheets** — pega las URLs que copiaste:

   ```yaml
   google_sheets:
     enabled: true
     shared_url: "https://docs.google.com/..."
     published_url: "https://docs.google.com/..."
   ```

5. **Tema** (opcional) — escoge un tema visual:

   ```yaml
   telar_theme: "paisajes"  # Opciones: paisajes, neogranadina, santa-barbara, austin
   ```

6. Haz clic en **Commit changes** para guardar

![Editando config: título y URL](/images/config_title.gif)
![Editando config: tema](/images/config_theme.gif)

### Verifica tu configuración

Después de hacer *commit*, GitHub Actions construirá y publicará tu sitio automáticamente. Esto toma de 2 a 5 minutos.

1. Haz clic en la pestaña **Actions** para ver el progreso de la *build*
2. Cuando termine, visita tu sitio en la URL que configuraste
3. Deberías ver un sitio vacío de Telar con tu título y tema

![Página de inicio de Telar con título y menú de navegación](/images/telar-homepage.png)

{: .warning }
> Si la compilación falla o tu sitio no se ve bien, revisa tu `_config.yml` con cuidado. Errores comunes:
> - **Comillas sin cerrar** — cada `"` necesita su par
> - **Falta espacio después de los dos puntos** — escribe `title: "Mi sitio"`, no `title:"Mi sitio"`
> - **Indentación incorrecta** — las opciones anidadas como `shared_url` deben indentarse con espacios, no tabulaciones
> - **baseurl no coincide** — debe coincidir exactamente con el nombre de tu repositorio, todo en minúsculas
> - **Solo una URL de Google Sheets** — necesitas tanto la URL compartida como la URL publicada; son diferentes
>
> Consulta la [Referencia de configuración](/guia/configurar/configuracion/) para la lista completa de opciones. También puedes pegar tu `_config.yml` en el [Validador de Configuración de Telar](/guia/configurar/validador-de-configuracion/) para buscar errores, o usar el [Generador y editor de configuración](/guia/configurar/generador-de-configuracion/) para crear uno desde cero.



## Próximos pasos

Tu sitio está configurado y funcionando. Continúa con el tutorial de Primeros pasos:

- **[Agrega tu contenido](/guia/primeros-pasos/agrega-contenido/)** — Sube imágenes, llena tu hoja de cálculo y crea tu primera historia
- **[Revisa y perfecciona](/guia/primeros-pasos/revisa-y-perfecciona/)** — Ajusta coordenadas de imagen, revisa tu sitio y dale los toques finales
- **[Planea tu narrativa](/guia/primeros-pasos/estructura-narrativa/)** — Conoce cómo se articulan historias, pasos y paneles

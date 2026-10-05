---
layout: docs
title: "8. Para desarrolladores"
parent: Documentación
nav_order: 8
has_children: true
lang: es
permalink: /guia/desarrolladores/
---

# Para desarrolladores

Documentación técnica para desarrolladores, colaboradores y quienes mantienen versiones fork de Telar.

## Para quién es esta sección

Esta sección está diseñada para:
- **Desarrolladores** que construyen funcionalidades o arreglan errores en Telar
- **Mantenedores** de versiones fork de Telar para instituciones específicas
- **Colaboradores** que quieren entender la arquitectura de Telar
- **Usuarios avanzados** que resuelven problemas de compilación o personalizan Telar

Si estás creando el contenido de un sitio de Telar, lo que probablemente necesitas son las secciones principales de la documentación.

---

## Qué hay en esta sección

### [8.1 Desarrollo local](/guia/desarrolladores/desarrollo-local/)
Configura tu entorno de desarrollo, ejecuta compilaciones localmente y prueba cambios antes de desplegar.

### [8.2 GitHub Actions](/guia/desarrolladores/github-actions/)
Entiende el flujo de trabajo automatizado de compilación de Telar y cómo personalizar el *pipeline* de despliegue.

### [8.3 Arquitectura del sistema de demos](/guia/desarrolladores/sistema-demos/)
Aprende cómo funciona el sistema de obtención de contenido de demostración, desde el emparejamiento de versiones hasta la integración de paquetes.

### [8.4 Arquitectura del sistema de inserción](/guia/desarrolladores/sistema-insercion/)
Detalles técnicos del sistema de inserción iframe de Telar y cómo maneja diferentes contextos.

### [8.5 Estilos avanzados](/guia/desarrolladores/estilos/)
Personaliza los estilos de Telar con CSS propio, variables de CSS y capas de cascada.

### [8.6 Diseños y pantallas pequeñas](/guia/desarrolladores/moviles/)
Cómo escoge la página de una historia entre sus dos diseños y cómo se adapta el sitio a las ventanas pequeñas o bajas.

### [8.7 Vocabulario del motor de historias](/guia/desarrolladores/motor-de-historias/)
Los términos con que el código del motor de historias y esta documentación nombran las partes de una historia, sus movimientos y sus diseños.

---

## Contribuir a Telar

Telar es código abierto y recibe contribuciones con gusto. Antes de contribuir:

1. **Configura desarrollo local** (8.1) para probar tus cambios
2. **Entiende el sistema de compilación** (8.2, 8.3) para ver cómo se procesa el contenido
3. **Sigue los patrones existentes** en el código base
4. **Prueba exhaustivamente** antes de enviar pull requests

**Repositorio**: [UCSB-AMPLab/telar](https://github.com/UCSB-AMPLab/telar)

---

## Obtener ayuda

- **Issues**: Reporta errores o solicita funcionalidades en [GitHub Issues](https://github.com/UCSB-AMPLab/telar/issues)
- **Discussions**: Haz preguntas en [GitHub Discussions](https://github.com/UCSB-AMPLab/telar/discussions)
- **Email**: Contacta a los mantenedores para problemas sensibles o alianzas institucionales

---

## Enlaces rápidos

- [Documentación principal](/guia/) - Documentación para quienes crean contenido
- [Referencia de configuración](/guia/configurar/configuracion/) - Todas las opciones de _config.yml
- [Referencia CSV: Proyecto](/guia/tus-datos/csv-proyecto/) - Documentación de columnas CSV

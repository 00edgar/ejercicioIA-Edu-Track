# EduTrack - Plataforma EdTech Colombiana

Prototipo funcional de la landing page de EduTrack, una startup colombiana de cursos de tecnología en línea. Construido con HTML, CSS y JavaScript vanilla como parte de un taller de Prompt Engineering aplicado a maquetación web y generación de datasets sintéticos.

---

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Guía de Archivos](#guía-de-archivos)
- [Secciones de la Landing](#secciones-de-la-landing)
- [Sistema de Autenticación](#sistema-de-autenticación)
- [Persistencia de Datos](#persistencia-de-datos)
- [Instalación y Uso](#instalación-y-uso)

---

## Descripción General

EduTrack ofrece cursos de tecnología en línea para profesionales colombianos, enfocados en desarrolladores junior y mid entre 22 y 35 años. Este prototipo incluye:

- Landing page completa con diseño dark mode y glassmorphism.
- Catálogo de cursos con búsqueda, filtros, detalle en modal y sistema de favoritos.
- Autenticación de usuarios (registro e inicio de sesión) con validación y persistencia.
- Datos sintéticos para estadísticas, cursos, testimonios y preguntas frecuentes.
- Interactividad completa: carrusel, animaciones al hacer scroll, acordeón FAQ y formularios con feedback en tiempo real.

---

## Tecnologías

| Capa       | Tecnología                    |
|------------|-------------------------------|
| Estructura | HTML5 semántico               |
| Estilos    | CSS3 puro (variables, flexbox, grid, glassmorphism) |
| Lógica     | JavaScript ES6+ (vanilla, sin frameworks) |
| Fuente     | Google Fonts - Inter          |
| APIs Web   | Intersection Observer, localStorage, sessionStorage |

---

## Estructura del Proyecto
edutrack/
├── index.html # Estructura y contenido de la landing
├── style.css # Estilos visuales y responsive design
├── app.js # Lógica de negocio e interactividad
└── README.md # Este archivo

text

---

## Guía de Archivos

### index.html
Esqueleto semántico de la página. Cada sección tiene un `id` único que permite:
- Navegación interna con desplazamiento suave.
- Inyección dinámica de contenido desde JavaScript.
- Referencia directa para modales y formularios.

Los modales (`#auth-modal`, `#course-modal`) se incluyen al final del `<body>`.

### style.css
Sistema de diseño completo:
- **Variables CSS** en `:root` para colores, sombras y transiciones.
- **Glassmorphism**: fondos semitransparentes con `backdrop-filter: blur()` y bordes sutiles.
- **Dark mode**: fondo azul noche profundo (`#0B0F1A`), texto blanco humo (`#F1F5F9`).
- **Paleta de acentos**: cyan (`#38BDF8`) para tecnología, dorado (`#FBBF24`) para CTAs y guiño a Colombia.
- **Animaciones**: clase `.reveal` con Intersection Observer para entradas al hacer scroll.
- **Responsive**: media query a 768px con menú hamburguesa y reorganización de grid.

### app.js
Organizado en módulos funcionales:

| Módulo              | Responsabilidad                                      |
|---------------------|------------------------------------------------------|
| `data`              | Objeto central con cursos, testimonios, FAQ y estadísticas |
| `getUsers/saveUsers`| CRUD de usuarios en localStorage                     |
| `register/login/logout` | Autenticación completa                          |
| `updateAuthUI`      | Refresca header y CTAs según estado de sesión        |
| `renderCourses`     | Grid dinámico con filtros, búsqueda y favoritos      |
| `toggleFavorite`    | Persiste favoritos por usuario autenticado           |
| `renderTestimonials`| Carrusel manual y automático                         |
| `renderFAQ`         | Acordeón interactivo                                 |
| `animateCounters`   | Animación numérica con Intersection Observer         |
| `openModal/closeModal` | Control de visibilidad de modales                 |

---

## Secciones de la Landing

| # | Sección             | ID                  | Contenido                                        |
|---|---------------------|---------------------|--------------------------------------------------|
| 1 | Header              | `header`            | Logo, nav, botones de auth (cambian según sesión)|
| 2 | Hero                | `hero`              | Título, subtítulo, 2 CTAs, dashboard decorativo  |
| 3 | Estadísticas        | `estadisticas`      | Contadores animados (estudiantes, cursos, satisfacción) |
| 4 | Propuesta de valor  | `propuesta-valor`   | 4 tarjetas con beneficios                        |
| 5 | Cursos destacados   | `cursos`            | Buscador, filtros, grid de 12 cursos con favoritos|
| 6 | Cómo funciona       | `como-funciona`     | 3 pasos del proceso de aprendizaje               |
| 7 | Testimonios         | `testimonios`       | Carrusel de 4 opiniones                          |
| 8 | Planes y precios    | `planes`            | 3 tarjetas (Básico, Pro, Equipo) en COP          |
| 9 | FAQ                 | `faq`               | Acordeón con 5 preguntas frecuentes              |
|10 | CTA final           | `cta-final`         | Frase motivadora y botón de registro             |
|11 | Footer              | `footer`            | Enlaces legales, redes sociales, registro        |

---

## Sistema de Autenticación

### Flujo de registro
1. Usuario completa correo, contraseña y confirmación.
2. Se valida que el correo no exista en `localStorage`.
3. Se crea el usuario y se inicia sesión automáticamente.
4. El contador de estudiantes se incrementa en 1.

### Flujo de inicio de sesión
1. Usuario ingresa correo y contraseña.
2. Se comparan contra los datos en `localStorage`.
3. Si coinciden, se guarda la sesión en `sessionStorage`.

### Cierre de sesión
1. Se elimina la sesión de `sessionStorage`.
2. La UI vuelve a mostrar "Iniciar sesión" y "Registrarse".
3. Los favoritos quedan guardados pero no se muestran hasta volver a iniciar sesión.

---

## Persistencia de Datos

| Dato               | Storage         | Clave                     | Vida útil               |
|--------------------|-----------------|---------------------------|-------------------------|
| Usuarios           | `localStorage`  | `edutrack_users`          | Permanente              |
| Sesión activa      | `sessionStorage`| `edutrack_session`        | Hasta cerrar navegador  |
| Favoritos          | `localStorage`  | `fav_{email}`             | Permanente por usuario  |

---

## Instalación y Uso

1. Descarga los archivos `index.html`, `style.css` y `app.js`.
2. Colócalos en la misma carpeta.
3. Abre `index.html` en cualquier navegador moderno (Chrome, Firefox, Edge).

**No requiere servidor, npm ni dependencias externas**, solo conexión a internet para cargar la fuente Inter desde Google Fonts.
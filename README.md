# Tech Academy

Plataforma web educativa desarrollada en **FrontEnd 1 - CESDE (2026-2)**.

El proyecto es un MVP funcional que aplica manipulación del DOM, captura de eventos, arreglos de objetos, temporizadores (`setTimeout`), contadores dinámicos, listas con checkboxes y persistencia con `localStorage`, tal como se vio en clase con el docente Diego Giraldo Zapata.

---

## Estado actual del proyecto

| Módulo | Archivo | Estado |
|---|---|---|
| Página de inicio | `index.html` + `js/main.js` | ✅ Funcional |
| Registro de aprendices | `registro.html` + `js/registro.js` | ✅ Funcional |
| Inicio de sesión | `login.html` + `js/login.js` | ✅ Funcional |
| Dashboard Profesor | `dashBoardProfesor.html` + `js/dashBoardProfesor.js` | ✅ Funcional |
| Dashboard Alumno | `dashBoardAlumno.html` + `js/dashBoardAlumno.js` | ✅ Funcional |

---

## Tecnologías usadas

- **HTML5** — estructura semántica
- **CSS3** — Flexbox, Grid, variables CSS, transiciones (hoja de estilos unificada en `css/styles.css`)
- **JavaScript Vanilla** — DOM, eventos, arreglos de objetos, `setTimeout`, `localStorage`
- Tipografía: `Special Elite` (Google Fonts)

No se usaron frameworks ni librerías externas. Todo el código JavaScript sigue los conceptos vistos en las sesiones del curso (`todo`, `Contador` y `ejemploLocalStorage`).

---

## Credenciales de prueba

| Rol | Usuario (o Documento) | Contraseña | Destino |
|---|---|---|---|
| Docente | `docente` | `1234` | `dashBoardProfesor.html` |
| Admin | `admin` | `123` | `dashBoardProfesor.html` |
| Estudiante 1 (Mariana Gómez) | `mariana` (o `1001`) | `1234` | `dashBoardAlumno.html` |
| Estudiante 2 (Carlos Restrepo) | `carlos` (o `1002`) | `1234` | `dashBoardAlumno.html` |
| Estudiante 3 (Luisa Fernández) | `luisa` (o `1003`) | `1234` | `dashBoardAlumno.html` |
| Estudiante 4 (Sebastián Ramírez) | `sebastian` (o `1004`) | `1234` | `dashBoardAlumno.html` |
| Estudiante 5 (Juan Camilo Montoya) | `juan` (o `1005`) | `1234` | `dashBoardAlumno.html` |

---

## Estructura del proyecto

```
tech-academy/
├── css/
│   └── styles.css              # Estilos unificados y consistentes de toda la plataforma
├── js/
│   ├── main.js                 # Lógica e interacción del catálogo en la página principal
│   ├── login.js                # Validación de credenciales, espera con setTimeout y redirección
│   ├── registro.js             # Captura de datos y registro sincronizado con localStorage
│   ├── dashBoardProfesor.js    # Gestión separada de calificaciones, asistencias por sesión y KPIs
│   └── dashBoardAlumno.js      # Consulta de notas, asistencia y lista de compromisos (To-Do)
├── Images/                     # Imágenes, fondos, iconos y personajes
├── mockup/                     # Capturas de referencia visual del diseño
├── .gitignore                  # Excluye carpetas locales y archivos privados
├── index.html                  # Página de inicio con catálogo interactivo
├── login.html                  # Pantalla de inicio de sesión
├── registro.html               # Formulario de registro de aprendices
├── dashBoardProfesor.html      # Panel académico del profesor (Notas y Asistencia separadas)
├── dashBoardAlumno.html        # Panel académico del estudiante
└── README.md                   # Documentación del proyecto
```

---

## Cómo ejecutar localmente

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/CalejandroGomez/tech-academy.git
   ```
2. Abrir `index.html` directamente en el navegador, o usar la extensión **Live Server** de VS Code.

---

## Equipo de desarrollo

Proyecto para el módulo **FrontEnd 1 - CESDE**
Docente: Diego Giraldo Zapata — dgiraldoza@cesde.net

# Tech Academy

Plataforma web educativa desarrollada en **FrontEnd 1 - CESDE (2026-2)**.

El proyecto es un MVP funcional que aplica manipulación del DOM, captura de eventos, arreglos de objetos y persistencia con `localStorage`, tal como se vio en clase con el docente Diego Giraldo Zapata.

---

## Estado actual del proyecto

| Módulo | Archivo | Estado |
|---|---|---|
| Página de inicio | `index.html` + `js/main.js` | ✅ Funcional |
| Registro de aprendices | `registro.html` + `js/registro.js` | ✅ Funcional |
| Inicio de sesión | `login.html` + `js/login.js` | ✅ Funcional |
| Panel de seguimiento | `seguimiento.html` + `js/seguimiento.js` | ✅ Funcional |
| Plataforma de estudiantes | — | 🚧 Pendiente próxima entrega |

> **Nota:** El inicio de sesión con rol de estudiante muestra un aviso de que la plataforma está en desarrollo. El acceso al panel de seguimiento está habilitado para docentes (`usuario: docente / contraseña: 1234` o `usuario: admin / contraseña: 123`).

---

## Tecnologías usadas

- **HTML5** — estructura semántica
- **CSS3** — Flexbox, Grid, variables CSS, transiciones (hoja de estilos unificada en `css/styles.css`)
- **JavaScript Vanilla** — DOM, eventos, arreglos de objetos, `localStorage`
- Tipografía: `Special Elite` (Google Fonts)

No se usaron frameworks ni librerías externas. Todo el código JavaScript sigue los conceptos vistos en las sesiones S7 a S12 del curso.

---

## Credenciales de prueba

| Rol | Usuario | Contraseña | Destino |
|---|---|---|---|
| Docente | `docente` | `1234` | `seguimiento.html` |
| Admin | `admin` | `123` | `seguimiento.html` |
| Estudiante | `estudiante` | `estudiante123` | Aviso + inicio |
| Aprendiz registrado | correo o nombre del registro | contraseña usada en registro | Aviso + inicio |

---

## Estructura del proyecto

```
tech-academy/
├── css/
│   └── styles.css           # Estilos unificados y consistentes de toda la plataforma
├── js/
│   ├── main.js              # Lógica e interacción del catálogo en la página principal
│   ├── login.js             # Validación de credenciales y redirección por roles
│   ├── registro.js          # Captura de datos y registro con localStorage
│   └── seguimiento.js       # Gestión de notas, métricas y filtros del docente
├── Images/                  # Imágenes, fondos, iconos y personajes
├── mockup/                  # Capturas de referencia visual del diseño
├── .gitignore               # Excluye carpetas locales y archivos privados
├── index.html               # Página de inicio con catálogo interactivo
├── login.html               # Pantalla de inicio de sesión
├── registro.html            # Formulario de registro de aprendices
├── seguimiento.html         # Panel de seguimiento académico docente
└── README.md                # Documentación del proyecto
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

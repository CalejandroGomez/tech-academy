// Elementos del formulario de login
const formulario = document.getElementById('formularioLogin');
const inputUsuario = document.getElementById('usuario');
const inputContrasena = document.getElementById('contrasena');
const mensajeError = document.getElementById('mensajeLogin');

// Validar credenciales al enviar el formulario
if (formulario) {
  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const user = inputUsuario.value.trim();
    const pass = inputContrasena.value.trim();

    // Usuarios registrados en localStorage
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Buscar coincidencia en la lista de registrados
    let usuarioEncontrado = null;
    for (let u of usuariosRegistrados) {
      if ((u.nombre === user || u.documento === user || u.correo === user) && u.contrasena === pass) {
        usuarioEncontrado = u;
        break;
      }
    }

    // 1. Docente o Admin -> acceso al panel de seguimiento
    if ((user === "admin" && pass === "123") || (user === "docente" && pass === "1234")) {
      const docenteActivo = {
        nombre: user === "docente" ? "Profesor Diego" : "Administrador",
        rol: "docente"
      };
      localStorage.setItem('usuarioActivo', JSON.stringify(docenteActivo));
      ingresoDocente("seguimiento.html");

    // 2. Estudiante -> aviso de plataforma en desarrollo
    } else if ((user === "estudiante" && pass === "estudiante123") || (usuarioEncontrado && usuarioEncontrado.rol === "aprendiz")) {
      const nombreEstudiante = usuarioEncontrado ? usuarioEncontrado.nombre : "Aprendiz";
      const estudianteActivo = {
        nombre: nombreEstudiante,
        rol: "aprendiz"
      };
      localStorage.setItem('usuarioActivo', JSON.stringify(estudianteActivo));
      avisoEstudiante(nombreEstudiante);

    // 3. Error en credenciales
    } else {
      mostrarError("Usuario o contraseña incorrectos.");
    }
  });
}

// Redireccionar al panel de seguimiento
function ingresoDocente(urlDestino) {
  mensajeError.innerHTML = "";
  alert("Acceso correcto. Redirigiendo al panel...");
  window.location.href = urlDestino;
}

// Mensaje temporal para estudiantes y redirección al index
function avisoEstudiante(nombre) {
  alert(`Bienvenido ${nombre}. La plataforma de estudiantes está en desarrollo para la siguiente entrega. Redirigiendo al inicio...`);
  window.location.href = "index.html";
}

// Mostrar mensaje de error en pantalla
function mostrarError(texto) {
  mensajeError.style.color = '#8b0000';
  mensajeError.style.fontWeight = 'bold';
  mensajeError.innerHTML = texto;
  mensajeError.style.opacity = '1';
}
// Referencias a los elementos del formulario de login
const formulario = document.getElementById('formularioLogin');
const inputUsuario = document.getElementById('usuario');
const inputContrasena = document.getElementById('contrasena');
const mensajeError = document.getElementById('mensajeLogin');
const botonSubmit = document.querySelector('.boton-login');

// Evento submit para capturar el intento de inicio de sesión
if (formulario) {
  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const user = inputUsuario.value.trim();
    const pass = inputContrasena.value.trim();

    // Consultamos la lista de usuarios guardados en localStorage desde registro.html
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Buscamos si coincide con algún usuario registrado
    const usuarioEncontrado = usuariosRegistrados.find(function (u) {
      return (u.nombre === user || u.documento === user || u.correo === user) && u.contrasena === pass;
    });

    // 1. Caso Docente / Administrador: acceso directo al módulo de calificaciones
    if ((user === "admin" && pass === "123") || (user === "docente" && pass === "1234")) {
      const docenteActivo = {
        nombre: user === "docente" ? "Profesor Diego" : "Administrador",
        rol: "docente"
      };
      localStorage.setItem('usuarioActivo', JSON.stringify(docenteActivo));
      ingresoDocente("seguimiento.html");

    // 2. Caso Estudiante (cuenta por defecto o usuario creado en registro.html)
    } else if ((user === "estudiante" && pass === "estudiante123") || (usuarioEncontrado && usuarioEncontrado.rol === "aprendiz")) {
      const nombreEstudiante = usuarioEncontrado ? usuarioEncontrado.nombre : "Aprendiz";
      const estudianteActivo = {
        nombre: nombreEstudiante,
        rol: "aprendiz"
      };
      localStorage.setItem('usuarioActivo', JSON.stringify(estudianteActivo));
      avisoEstudiante(nombreEstudiante);

    // 3. Credenciales incorrectas
    } else {
      mostrarError("Usuario o contraseña incorrectos.");
    }
  });
}

// Redirección al panel docente
function ingresoDocente(urlDestino) {
  mensajeError.textContent = "";
  mensajeError.style.opacity = '0';

  botonSubmit.textContent = "Accediendo al panel...";
  botonSubmit.style.backgroundColor = "#2c1e11";
  botonSubmit.style.pointerEvents = "none";

  setTimeout(function () {
    window.location.href = urlDestino;
  }, 1000);
}

// Notificación para estudiantes (plataforma estudiantil en construcción)
function avisoEstudiante(nombre) {
  mensajeError.style.color = "#1b5e20";
  mensajeError.style.fontWeight = "bold";
  mensajeError.style.opacity = '1';
  mensajeError.textContent = `Bienvenido ${nombre}. La plataforma de estudiantes está en desarrollo para la siguiente entrega. Redirigiendo al inicio...`;

  botonSubmit.textContent = "Portal en desarrollo...";
  botonSubmit.style.backgroundColor = "#2c1e11";
  botonSubmit.style.pointerEvents = "none";

  setTimeout(function () {
    window.location.href = "index.html";
  }, 2500);
}

// Manejo de mensaje de error visual
function mostrarError(texto) {
  mensajeError.style.color = '#8b0000';
  mensajeError.style.fontWeight = 'bold';
  mensajeError.textContent = texto;
  mensajeError.style.opacity = '1';

  botonSubmit.classList.add('error-shake');
  setTimeout(function () {
    botonSubmit.classList.remove('error-shake');
  }, 500);
}
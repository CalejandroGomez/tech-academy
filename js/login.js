// Elementos del formulario de login
const formulario = document.getElementById("formularioLogin");
const inputUsuario = document.getElementById("usuario");
const inputContrasena = document.getElementById("contrasena");
const mensajeLogin = document.getElementById("mensajeLogin");
const botonLogin = document.querySelector(".boton-login");


// FETCH
async function cargarUsuarios() {
  try {
    // llamar alumnos
    const respuestaAlumnos = await fetch("alumnos.json");
    const alumnos = await respuestaAlumnos.json();
    console.log("Los alumnos recuperados del .json son: ", alumnos);
    // llamar docentes
    const respuestaDocentes = await fetch("docentes.json");
    const docentes = await respuestaDocentes.json();
    console.log("Los docentes recuperados del .json son: ", docentes);
    // Guardar en el local storage
    if (!localStorage.getItem("usuarios")) {
      localStorage.setItem("usuarios", JSON.stringify(alumnos));
    }
    if (!localStorage.getItem("docentes")) {
      localStorage.setItem("docentes", JSON.stringify(docentes));
    }
    if (!localStorage.getItem("calificaciones_academicas")) {
      localStorage.setItem("calificaciones_academicas", JSON.stringify(alumnos));
    }
    if (!localStorage.getItem("asistencias_academicas")) {
      localStorage.setItem("asistencias_academicas", JSON.stringify(alumnos));
    }
  } catch (error) {
    console.error(error);
  }
}
cargarUsuarios();


// Validar datos al enviar el formulario
if (formulario) {
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const user = inputUsuario.value.trim();
    const pass = inputContrasena.value.trim();

    if (user === "" || pass === "") {
      mostrarMensaje("Por favor ingresa tu usuario y contraseña.", "error");
      return;
    }

    const userMin = user.toLowerCase();

    // Buscar en la lista de docentes guardada en localStorage
    const docentesRegistrados = JSON.parse(localStorage.getItem("docentes")) || [];
    let docenteEncontrado = null;

    for (let d of docentesRegistrados) {
      const coincideUsuario = d.usuario && d.usuario.toLowerCase() === userMin;
      const coincideCorreo = d.correo && d.correo.toLowerCase() === userMin;

      if ((coincideUsuario || coincideCorreo) && d.contrasena === pass) {
        docenteEncontrado = d;
        break;
      }
    }

    if (docenteEncontrado) {
      const docenteActivo = {
        nombre: docenteEncontrado.nombre,
        usuario: docenteEncontrado.usuario,
        rol: "docente"
      };
      localStorage.setItem("usuarioActivo", JSON.stringify(docenteActivo));
      iniciarSesionConEspera(
        `¡Bienvenido, ${docenteActivo.nombre}! Acceso correcto. Redirigiendo al panel docente...`,
        "dashBoardProfesor.html"
      );
      return;
    }

    // Buscar en la lista de estudiantes guardada en localStorage
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
    let estudianteEncontrado = null;

    for (let u of usuariosRegistrados) {
      const coincideUsuario = u.usuario && u.usuario.toLowerCase() === userMin;
      const coincideNombre = u.nombre && u.nombre.toLowerCase() === userMin;
      const coincideDocumento = u.documento && u.documento === user;
      const coincideCorreo = u.correo && u.correo.toLowerCase() === userMin;

      if ((coincideUsuario || coincideNombre || coincideDocumento || coincideCorreo) && u.contrasena === pass) {
        estudianteEncontrado = u;
        break;
      }
    }

    if (estudianteEncontrado) {
      const estudianteActivo = {
        nombre: estudianteEncontrado.nombre,
        documento: estudianteEncontrado.documento,
        correo: estudianteEncontrado.correo,
        rol: "aprendiz"
      };
      localStorage.setItem("usuarioActivo", JSON.stringify(estudianteActivo));
      iniciarSesionConEspera(
        `¡Bienvenido(a), ${estudianteActivo.nombre}! Acceso correcto. Redirigiendo a tu panel...`,
        "dashBoardAlumno.html"
      );
    } else {
      mostrarMensaje("Usuario o contraseña incorrectos.", "error");
    }
  });
}

// Mostrar mensaje de acceso y redirigir después de una espera
function iniciarSesionConEspera(texto, urlDestino) {
  mostrarMensaje("Verificando credenciales...", "exito");

  if (botonLogin) {
    botonLogin.disabled = true;
    botonLogin.style.opacity = "0.7";
  }

  setTimeout(function () {
    mostrarMensaje(texto, "exito");
  }, 600);

  setTimeout(function () {
    window.location.href = urlDestino;
  }, 2200);
}

// Mostrar mensaje de error o confirmación en pantalla`
function mostrarMensaje(texto, tipo) {
  if (!mensajeLogin) return;

  mensajeLogin.textContent = texto;
  mensajeLogin.setAttribute("class", "mensaje-login " + tipo);
}

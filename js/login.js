// Elementos del formulario de login
const formulario = document.getElementById("formularioLogin");
const inputUsuario = document.getElementById("usuario");
const inputContrasena = document.getElementById("contrasena");
const mensajeLogin = document.getElementById("mensajeLogin");
const botonLogin = document.querySelector(".boton-login");

// Los 5 estudiantes base del curso (mismos que aparecen en el dashboard del profesor)
const estudiantesBase = [
  {
    nombre: "Mariana Gómez",
    usuario: "mariana",
    documento: "1001",
    correo: "mariana@techacademy.edu",
    telefono: "3001112233",
    contrasena: "1234",
    rol: "aprendiz"
  },
  {
    nombre: "Carlos Restrepo",
    usuario: "carlos",
    documento: "1002",
    correo: "carlos@techacademy.edu",
    telefono: "3002223344",
    contrasena: "1234",
    rol: "aprendiz"
  },
  {
    nombre: "Luisa Fernández",
    usuario: "luisa",
    documento: "1003",
    correo: "luisa@techacademy.edu",
    telefono: "3003334455",
    contrasena: "1234",
    rol: "aprendiz"
  },
  {
    nombre: "Sebastián Ramírez",
    usuario: "sebastian",
    documento: "1004",
    correo: "sebastian@techacademy.edu",
    telefono: "3004445566",
    contrasena: "1234",
    rol: "aprendiz"
  },
  {
    nombre: "Juan Camilo Montoya",
    usuario: "juan",
    documento: "1005",
    correo: "juan@techacademy.edu",
    telefono: "3005556677",
    contrasena: "1234",
    rol: "aprendiz"
  }
];

// Inicializar y limpiar la lista de usuarios en localStorage para garantizar los 5 estudiantes
function inicializarUsuariosBase() {
  const guardados = JSON.parse(localStorage.getItem("usuarios")) || [];
  const nombresNoPermitidos = ["tavo", "juan", "profesor diego", "administrador", "docente", "admin"];

  // Empezar con los 5 estudiantes base
  const listaLimpia = [...estudiantesBase];

  // Conservar aprendices adicionales válidos que no sean los registros de prueba descartados
  for (let u of guardados) {
    if (!u || !u.nombre) continue;
    const nombreMin = u.nombre.trim().toLowerCase();
    if (nombresNoPermitidos.includes(nombreMin)) continue;

    let yaExiste = false;
    for (let base of listaLimpia) {
      if (base.nombre.toLowerCase() === nombreMin) {
        yaExiste = true;
        break;
      }
    }
    if (!yaExiste && u.rol === "aprendiz") {
      listaLimpia.push(u);
    }
  }

  localStorage.setItem("usuarios", JSON.stringify(listaLimpia));
  return listaLimpia;
}

// Validar credenciales al enviar el formulario
if (formulario) {
  const listaUsuarios = inicializarUsuariosBase();

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const user = inputUsuario.value.trim();
    const pass = inputContrasena.value.trim();

    if (user === "" || pass === "") {
      mostrarMensaje("Por favor ingresa tu usuario y contraseña.", "error");
      return;
    }

    const userMin = user.toLowerCase();

    // 1. Docente o Admin -> acceso al panel del profesor (dashBoardProfesor.html)
    if ((userMin === "admin" && pass === "123") || (userMin === "docente" && pass === "1234")) {
      const docenteActivo = {
        nombre: userMin === "docente" ? "Profesor Diego" : "Administrador",
        usuario: userMin,
        rol: "docente"
      };
      localStorage.setItem("usuarioActivo", JSON.stringify(docenteActivo));
      iniciarSesionConEspera(
        `¡Bienvenido, ${docenteActivo.nombre}! Acceso correcto. Redirigiendo al panel docente...`,
        "dashBoardProfesor.html"
      );
      return;
    }

    // 2. Buscar en la lista de los 5 estudiantes (o aprendices registrados)
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || listaUsuarios;
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
      // 3. Error en credenciales
      mostrarMensaje("Usuario o contraseña incorrectos.", "error");
    }
  });
}

// Mostrar mensaje de éxito y esperar antes de redirigir (como en ejemploLocalStorage)
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

// Mostrar mensaje en pantalla (error o éxito)
function mostrarMensaje(texto, tipo) {
  if (!mensajeLogin) return;

  mensajeLogin.textContent = texto;
  mensajeLogin.style.fontWeight = "bold";
  mensajeLogin.style.opacity = "1";

  if (tipo === "exito") {
    mensajeLogin.className = "mensaje-login exito";
    mensajeLogin.style.color = "#1b4d20";
  } else {
    mensajeLogin.className = "mensaje-login error";
    mensajeLogin.style.color = "#8b0000";
  }
}

// Elementos del formulario de registro
const formRegistro = document.getElementById("form-registro");
const inputNombre = document.getElementById("nombre");
const inputDocumento = document.getElementById("documento");
const inputCorreo = document.getElementById("correo");
const inputTelefono = document.getElementById("telefono");
const inputContrasena = document.getElementById("contrasena-registro");
const mensajeRegistro = document.getElementById("mensaje-registro");

// Manejo del formulario de registro
if (formRegistro) {
  formRegistro.addEventListener("submit", function (evento) {
    evento.preventDefault();

    // Obtener valores de los campos
    const nombre = inputNombre.value.trim();
    const documento = inputDocumento.value.trim();
    const correo = inputCorreo.value.trim();
    const telefono = inputTelefono.value.trim();
    const contrasena = inputContrasena.value.trim();

    // Validar campos obligatorios
    if (!nombre || !documento || !correo || !telefono || !contrasena) {
      mensajeRegistro.textContent = "Por favor completa todos los campos.";
      mensajeRegistro.setAttribute("class", "mensaje-registro error");
      return;
    }

    // Obtener usuarios de localStorage o lista vacía
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Revisar si ya existe el documento o correo
    let usuarioExistente = null;
    for (let user of usuarios) {
      if (user.documento === documento || user.correo.toLowerCase() === correo.toLowerCase()) {
        usuarioExistente = user;
        break;
      }
    }

    if (usuarioExistente) {
      mensajeRegistro.textContent = "El documento o correo ya se encuentra registrado.";
      mensajeRegistro.setAttribute("class", "mensaje-registro error");
      return;
    }

    // Datos del nuevo usuario
    const nuevoUsuario = {
      nombre: nombre,
      documento: documento,
      correo: correo,
      telefono: telefono,
      contrasena: contrasena,
      rol: "aprendiz"
    };

    // Mostrar estado de carga inmediato en pantalla (como en ejemploLocalStorage)
    mensajeRegistro.textContent = "Registrando aprendiz en la academia...";
    mensajeRegistro.setAttribute("class", "mensaje-registro exito");

    // Guardar en la lista de usuarios y sincronizar con los registros académicos
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    sincronizarNuevoAprendiz(nombre);

    setTimeout(function () {
      mensajeRegistro.textContent = "¡Registro exitoso! Redirigiendo al inicio de sesión...";
    }, 800);

    // Redirigir al login después de la espera
    setTimeout(function () {
      window.location.href = "login.html";
    }, 2200);
  });
}

// Agrega al nuevo aprendiz a las listas de calificaciones y asistencia si ya existen en localStorage
function sincronizarNuevoAprendiz(nombreAprendiz) {
  const calificacionesGuardadas = JSON.parse(localStorage.getItem("calificaciones_academicas"));
  if (calificacionesGuardadas) {
    let existeEnNotas = false;
    for (let item of calificacionesGuardadas) {
      if (item.nombre.toLowerCase() === nombreAprendiz.toLowerCase()) {
        existeEnNotas = true;
        break;
      }
    }
    if (!existeEnNotas) {
      calificacionesGuardadas.push({
        nombre: nombreAprendiz,
        estado: "Pendiente",
        nota1: "0.0",
        nota2: "0.0",
        nota3: "0.0"
      });
      localStorage.setItem("calificaciones_academicas", JSON.stringify(calificacionesGuardadas));
    }
  }

  const asistenciasGuardadas = JSON.parse(localStorage.getItem("asistencias_academicas"));
  if (asistenciasGuardadas) {
    let existeEnAsistencia = false;
    for (let item of asistenciasGuardadas) {
      if (item.nombre.toLowerCase() === nombreAprendiz.toLowerCase()) {
        existeEnAsistencia = true;
        break;
      }
    }
    if (!existeEnAsistencia) {
      const hoy = new Date().toISOString().split("T")[0];
      asistenciasGuardadas.push({
        nombre: nombreAprendiz,
        fecha: hoy,
        presenteHoy: true,
        asistidas: 1,
        totales: 1
      });
      localStorage.setItem("asistencias_academicas", JSON.stringify(asistenciasGuardadas));
    }
  }
}

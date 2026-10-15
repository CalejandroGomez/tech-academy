// Elementos del formulario de registro
const formRegistro = document.getElementById("form-registro");
const inputNombre = document.getElementById("nombre");
const inputDocumento = document.getElementById("documento");
const inputCorreo = document.getElementById("correo");
const inputTelefono = document.getElementById("telefono");
const inputContrasena = document.getElementById("contrasena-registro");
const mensajeRegistro = document.getElementById("mensaje-registro");

// Manejo del formulario de registro
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
    mensajeRegistro.innerHTML = "Por favor completa todos los campos.";
    mensajeRegistro.className = "mensaje-registro error";
    return;
  }

  // Obtener usuarios de localStorage o lista vacía
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Revisar si ya existe el documento o correo
  let usuarioExistente = null;
  for (let user of usuarios) {
    if (user.documento === documento || user.correo === correo) {
      usuarioExistente = user;
      break;
    }
  }

  if (usuarioExistente) {
    mensajeRegistro.innerHTML =
      "El documento o correo ya se encuentra registrado.";
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
    rol: "aprendiz",
  };

  // Guardar en la lista y en localStorage
  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // Mostrar el aviso
  alert("¡Registro exitoso! Bienvenido a Tech Academy.");

  // Redirigir al login
  window.location.href = "login.html";
});

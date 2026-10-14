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
      mensajeRegistro.className = "mensaje-registro error";
      return;
    }

    // Obtener usuarios de localStorage o lista vacía
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Revisar si ya existe el documento o correo
    let usuarioExistente = null;
    for (let u of usuarios) {
      if (u.documento === documento || u.correo === correo) {
        usuarioExistente = u;
        break;
      }
    }

    if (usuarioExistente) {
      mensajeRegistro.textContent = "El documento o correo ya se encuentra registrado.";
      mensajeRegistro.className = "mensaje-registro error";
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

    // Guardar en la lista y en localStorage
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensajeRegistro.textContent = "¡Registro exitoso! Bienvenido a Tech Academy.";
    mensajeRegistro.className = "mensaje-registro exito";

    formRegistro.reset();

    // Redirigir al inicio después del registro
    setTimeout(function () {
      window.location.href = "index.html";
    }, 2000);
  });
}

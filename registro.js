const formRegistro = document.getElementById("form-registro");
const inputNombre = document.getElementById("nombre");
const inputDocumento = document.getElementById("documento");
const inputCorreo = document.getElementById("correo");
const inputTelefono = document.getElementById("telefono");
const inputContrasena = document.getElementById("contrasena-registro");
const mensajeRegistro = document.getElementById("mensaje-registro");

if (formRegistro) {
  formRegistro.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = inputNombre.value.trim();
    const documento = inputDocumento.value.trim();
    const correo = inputCorreo.value.trim();
    const telefono = inputTelefono.value.trim();
    const contrasena = inputContrasena.value.trim();

    if (!nombre || !documento || !correo || !telefono || !contrasena) {
      mensajeRegistro.textContent = "Por favor completa todos los campos.";
      mensajeRegistro.className = "mensaje-registro error";
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioExistente = usuarios.find(function (usuario) {
      return usuario.documento === documento || usuario.correo === correo;
    });

    if (usuarioExistente) {
      mensajeRegistro.textContent = "El documento o correo ya se encuentra registrado.";
      mensajeRegistro.className = "mensaje-registro error";
      return;
    }

    const nuevoUsuario = {
      nombre: nombre,
      documento: documento,
      correo: correo,
      telefono: telefono,
      contrasena: contrasena,
      rol: "aprendiz"
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensajeRegistro.textContent = "¡Registro exitoso! Bienvenido a Tech Academy.";
    mensajeRegistro.className = "mensaje-registro exito";

    formRegistro.reset();

    setTimeout(function () {
      window.location.href = "index.html";
    }, 2000);
  });
}

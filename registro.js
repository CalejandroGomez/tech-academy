// NOTAS DEL EQUIPO: Selectores principales para enlazar JavaScript con el HTML
const formRegistro = document.getElementById("form-registro");
const inputNombre = document.getElementById("nombre");
const inputDocumento = document.getElementById("documento");
const inputCorreo = document.getElementById("correo");
const inputTelefono = document.getElementById("telefono");
const inputContrasena = document.getElementById("contrasena-registro");
const mensajeRegistro = document.getElementById("mensaje-registro");

// NOTAS DEL EQUIPO: Evento submit - captura los datos del formulario sin recargar la página
if (formRegistro) {
  formRegistro.addEventListener("submit", function (evento) {
    evento.preventDefault();

    // Leemos el valor de cada campo y quitamos espacios innecesarios
    const nombre = inputNombre.value.trim();
    const documento = inputDocumento.value.trim();
    const correo = inputCorreo.value.trim();
    const telefono = inputTelefono.value.trim();
    const contrasena = inputContrasena.value.trim();

    // Validación: ningún campo puede quedar vacío
    if (!nombre || !documento || !correo || !telefono || !contrasena) {
      mensajeRegistro.textContent = "Por favor completa todos los campos.";
      mensajeRegistro.className = "mensaje-registro error";
      return;
    }

    // NOTAS DEL EQUIPO: Recuperamos la lista guardada o iniciamos con un arreglo vacío
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificamos que el documento o correo no estén ya registrados
    const usuarioExistente = usuarios.find(function (usuario) {
      return usuario.documento === documento || usuario.correo === correo;
    });

    if (usuarioExistente) {
      mensajeRegistro.textContent = "El documento o correo ya se encuentra registrado.";
      mensajeRegistro.className = "mensaje-registro error";
      return;
    }

    // NOTAS DEL EQUIPO: Creamos el objeto con los datos del nuevo aprendiz
    const nuevoUsuario = {
      nombre: nombre,
      documento: documento,
      correo: correo,
      telefono: telefono,
      contrasena: contrasena,
      rol: "aprendiz"
    };

    // Agregamos a la lista y guardamos en LocalStorage
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensajeRegistro.textContent = "¡Registro exitoso! Bienvenido a Tech Academy.";
    mensajeRegistro.className = "mensaje-registro exito";

    formRegistro.reset();

    // Redirige al inicio tras 2 segundos
    setTimeout(function () {
      window.location.href = "index.html";
    }, 2000);
  });
}

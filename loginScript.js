
document.addEventListener('DOMContentLoaded', function() {
    // 1. Seleccionamos los elementos usando los IDs de tu HTML
    const formulario = document.getElementById('formularioLogin');
    const inputUsuario = document.getElementById('usuario');
    const inputContrasena = document.getElementById('contrasena');
    const mensajeError = document.getElementById('mensajeLogin');
    const botonSubmit = document.querySelector('.boton-login');

    // Damos un poco de estilo inicial al mensaje de error (oculto por defecto)
    mensajeError.style.color = '#8B0000';
    mensajeError.style.fontWeight = 'bold';
    mensajeError.style.transition = 'opacity 0.3s';
    mensajeError.style.opacity = '0'; 

    // 2. Escuchamos el evento de envío del formulario
    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault(); // Evitamos que la página se recargue

        // Tomamos los valores y quitamos espacios en blanco
        const user = inputUsuario.value.trim();
        const pass = inputContrasena.value.trim();

        // 3. Validaciones
        if (user === "docente" && pass === "1234") {
            // Reemplaza el enlace por la ruta real que hizo tu equipo para el admin
            ingresoExitoso("docente.html"); 

        } else if (user === "estudiante" && pass === "estudiante123") {
            // Reemplaza el enlace por la ruta real para el estudiante
            ingresoExitoso("#"); 

        } else {
            // 4. Fallo: mostramos el error y hacemos vibrar el botón
            mensajeError.textContent = "Nombre o contraseña inválida.";
            mensajeError.style.opacity = '1';
            
            botonSubmit.classList.add('error-shake');
            
            // Quitamos la animación después de 0.5s para que pueda volver a usarse
            setTimeout(() => {
                botonSubmit.classList.remove('error-shake');
            }, 500);
        }
    });

    // Función para manejar el éxito y la redirección
    function ingresoExitoso(urlDestino) {
        mensajeError.style.opacity = '0';
        
        // Efecto temático en el botón
        botonSubmit.textContent = "Abriendo portal...";
        botonSubmit.style.backgroundColor = "#2c1e11";
        botonSubmit.style.transform = "scale(0.95)";
        botonSubmit.style.pointerEvents = "none"; // Deshabilita el botón

        // Redirige al link de tu equipo tras 1 segundo
        setTimeout(() => {
            window.location.href = urlDestino;
        }, 1000);

    }
  });
}

// Redireccionar al panel de seguimiento
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

// Mensaje temporal para estudiantes y redirección al index
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

// Mostrar mensaje de error en pantalla
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
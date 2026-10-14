// NOTAS DEL EQUIPO: Selector del botón de cierre de sesión del panel docente
const botonCerrar = document.querySelector('.boton-guardar');

// NOTAS DEL EQUIPO: Evento click para cerrar sesión y volver al inicio
// Se limpia el usuario activo del LocalStorage antes de redirigir
if (botonCerrar) {
  botonCerrar.addEventListener('click', function () {
    localStorage.removeItem('usuarioActivo');
    window.location.href = 'index.html';
  });
}
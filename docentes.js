// SELECTOR: Buscamos el botón en el HTML mediante su clase
const botonCerrar = document.querySelector('.boton-guardar');

botonCerrar.addEventListener('click', function() {
   
    alert('Cerrando sesión del Panel Docente...');
    
    window.location.href = 'index.html'; // window: ventana del navegador, location: para que cambie la pagina 
});
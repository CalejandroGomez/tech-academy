// NOTAS DEL EQUIPO: Selectores principales para enlazar JavaScript con el HTML
const contenedorEstudiantes = document.getElementById('contenedor-estudiantes');
const formEstudiante = document.getElementById('form-estudiante');
const inputNombre = document.getElementById('nuevo-nombre');
const selectEstado = document.getElementById('nuevo-estado');
const inputNota = document.getElementById('nueva-nota');
const inputAsistencia = document.getElementById('nueva-asistencia');
const inputBuscar = document.getElementById('buscar');
const btnGuardar = document.getElementById('btnGuardar');

// NOTAS DEL EQUIPO: Datos iniciales del curso o lectura desde LocalStorage (persistencia)
const datosPorDefecto = [
  { nombre: "Mariana Gómez", estado: "Entregado", nota: "4.5", asistencia: "95%" },
  { nombre: "Carlos Restrepo", estado: "En revisión", nota: "3.8", asistencia: "88%" },
  { nombre: "Luisa Fernández", estado: "Pendiente", nota: "2.5", asistencia: "75%" }
];

let estudiantes = JSON.parse(localStorage.getItem('estudiantes_seguimiento')) || datosPorDefecto;

// NOTAS DEL EQUIPO: Función para dibujar las filas de la tabla usando manipulación del DOM
function renderizarTabla() {
  contenedorEstudiantes.innerHTML = '';

  estudiantes.forEach(function (estudiante, indice) {
    const fila = document.createElement('div');
    fila.classList.add('fila');

    const colNombre = document.createElement('span');
    colNombre.textContent = estudiante.nombre;

    const colEstado = document.createElement('span');
    colEstado.textContent = estudiante.estado;

    const colNota = document.createElement('span');
    colNota.textContent = estudiante.nota;

    const colAsistencia = document.createElement('span');
    colAsistencia.textContent = estudiante.asistencia;

    // Botón borrar para la operación Delete del CRUD
    const colAccion = document.createElement('span');
    const btnBorrar = document.createElement('button');
    btnBorrar.classList.add('btn-Borrar');
    btnBorrar.textContent = 'Borrar';

    btnBorrar.addEventListener('click', function () {
      if (confirm(`¿Seguro que deseas eliminar a ${estudiante.nombre}?`)) {
        estudiantes.splice(indice, 1);
        guardarEnStorage();
        renderizarTabla();
      }
    });

    colAccion.appendChild(btnBorrar);

    fila.appendChild(colNombre);
    fila.appendChild(colEstado);
    fila.appendChild(colNota);
    fila.appendChild(colAsistencia);
    fila.appendChild(colAccion);

    contenedorEstudiantes.appendChild(fila);
  });
}

// NOTAS DEL EQUIPO: Guardar el arreglo actual en LocalStorage
function guardarEnStorage() {
  localStorage.setItem('estudiantes_seguimiento', JSON.stringify(estudiantes));
}

// NOTAS DEL EQUIPO: Evento submit para agregar un estudiante nuevo (Create del CRUD)
if (formEstudiante) {
  formEstudiante.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nuevo = {
      nombre: inputNombre.value.trim(),
      estado: selectEstado.value,
      nota: inputNota.value.trim(),
      asistencia: inputAsistencia.value.trim()
    };

    estudiantes.push(nuevo);
    guardarEnStorage();
    renderizarTabla();
    formEstudiante.reset();
  });
}

// NOTAS DEL EQUIPO: Botón de guardado explícito en LocalStorage
if (btnGuardar) {
  btnGuardar.addEventListener('click', function () {
    guardarEnStorage();
    alert('¡Datos de calificaciones guardados exitosamente en LocalStorage!');
  });
}

// NOTAS DEL EQUIPO: Filtro de búsqueda en tiempo real con evento input
if (inputBuscar) {
  inputBuscar.addEventListener('input', function () {
    const filtro = inputBuscar.value.toLowerCase();
    const filas = contenedorEstudiantes.querySelectorAll('.fila');

    filas.forEach(function (fila) {
      const nombre = fila.querySelector('span').textContent.toLowerCase();
      fila.style.display = nombre.includes(filtro) ? 'grid' : 'none';
    });
  });
}

// NOTAS DEL EQUIPO: Inicializar la tabla al cargar la página
renderizarTabla();
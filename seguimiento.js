// Referencias a los elementos del formulario y la tabla
const contenedorEstudiantes = document.getElementById('contenedor-estudiantes');
const formEstudiante = document.getElementById('form-estudiante');
const inputNombre = document.getElementById('nuevo-nombre');
const selectEstado = document.getElementById('nuevo-estado');
const inputNota = document.getElementById('nueva-nota');
const inputAsistencia = document.getElementById('nueva-asistencia');
const inputBuscar = document.getElementById('buscar');
const btnGuardar = document.getElementById('btnGuardar');
const btnSubmitEstudiante = document.getElementById('btn-submit-estudiante');
const btnCancelarEdicion = document.getElementById('btn-cancelar-edicion');

// Guarda el índice del estudiante que se está editando
let indiceEditando = null;

// Lista inicial por defecto o lo que haya en localStorage
const datosPorDefecto = [
  { nombre: "Mariana Gómez", estado: "Entregado", nota: "4.5", asistencia: "95%" },
  { nombre: "Carlos Restrepo", estado: "En revisión", nota: "3.8", asistencia: "88%" },
  { nombre: "Luisa Fernández", estado: "Pendiente", nota: "2.5", asistencia: "75%" }
];

let estudiantes = JSON.parse(localStorage.getItem('estudiantes_seguimiento')) || datosPorDefecto;

// Dibuja las filas de estudiantes en la tabla
function renderizarTabla() {
  contenedorEstudiantes.innerHTML = '';

  // Recorrer los estudiantes para generar cada fila
  for (let indice = 0; indice < estudiantes.length; indice++) {
    const estudiante = estudiantes[indice];

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

    const colAccion = document.createElement('span');

    // Botón para cargar los datos en el formulario y poder editar
    const btnEditar = document.createElement('button');
    btnEditar.classList.add('btn-editar');
    btnEditar.textContent = 'Editar';

    btnEditar.addEventListener('click', function () {
      // Cargamos los datos del estudiante seleccionado en el formulario
      inputNombre.value = estudiante.nombre;
      selectEstado.value = estudiante.estado;
      inputNota.value = estudiante.nota;
      inputAsistencia.value = estudiante.asistencia;

      // Cambiamos el modo a edición
      indiceEditando = indice;
      if (btnSubmitEstudiante) {
        btnSubmitEstudiante.textContent = 'Actualizar';
      }
      if (btnCancelarEdicion) {
        btnCancelarEdicion.style.display = 'inline-block';
      }
    });

    // Botón para eliminar un estudiante
    const btnBorrar = document.createElement('button');
    btnBorrar.classList.add('btn-Borrar');
    btnBorrar.textContent = 'Borrar';

    btnBorrar.addEventListener('click', function () {
      if (confirm(`¿Seguro que deseas eliminar a ${estudiante.nombre}?`)) {
        // Si estábamos editando este mismo estudiante, cancelamos la edición
        if (indiceEditando === indice) {
          cancelarEdicion();
        }
        estudiantes.splice(indice, 1);
        guardarEnStorage();
        renderizarTabla();
      }
    });

    colAccion.appendChild(btnEditar);
    colAccion.appendChild(btnBorrar);

    fila.appendChild(colNombre);
    fila.appendChild(colEstado);
    fila.appendChild(colNota);
    fila.appendChild(colAsistencia);
    fila.appendChild(colAccion);

    contenedorEstudiantes.appendChild(fila);
  }
}

// Restaura el formulario al estado original
function cancelarEdicion() {
  indiceEditando = null;
  formEstudiante.reset();
  if (btnSubmitEstudiante) {
    btnSubmitEstudiante.textContent = 'Añadir';
  }
  if (btnCancelarEdicion) {
    btnCancelarEdicion.style.display = 'none';
  }
}

// Guardar en localStorage
function guardarEnStorage() {
  localStorage.setItem('estudiantes_seguimiento', JSON.stringify(estudiantes));
}

// Agregar un nuevo estudiante o actualizar el seleccionado
if (formEstudiante) {
  formEstudiante.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nombre = inputNombre.value.trim();
    const estado = selectEstado.value;
    const nota = inputNota.value.trim();
    const asistencia = inputAsistencia.value.trim();

    if (!nombre || !nota || !asistencia) {
      alert('Por favor completa todos los campos del estudiante.');
      return;
    }

    const registro = {
      nombre: nombre,
      estado: estado,
      nota: nota,
      asistencia: asistencia
    };

    if (indiceEditando !== null) {
      // Actualizar registro existente
      estudiantes[indiceEditando] = registro;
      cancelarEdicion();
    } else {
      // Agregar nuevo registro
      estudiantes.push(registro);
      formEstudiante.reset();
    }

    guardarEnStorage();
    renderizarTabla();
  });
}

// Cancelar edición al hacer clic
if (btnCancelarEdicion) {
  btnCancelarEdicion.addEventListener('click', function () {
    cancelarEdicion();
  });
}

// Guardar cambios manualmente en localStorage
if (btnGuardar) {
  btnGuardar.addEventListener('click', function () {
    guardarEnStorage();
    alert('¡Datos de calificaciones guardados exitosamente en LocalStorage!');
  });
}

// Buscador en tiempo real por nombre
if (inputBuscar) {
  inputBuscar.addEventListener('input', function () {
    const filtro = inputBuscar.value.toLowerCase();
    const filas = contenedorEstudiantes.querySelectorAll('.fila');

    // Filtrar filas según lo escrito
    for (let fila of filas) {
      const colTexto = fila.querySelector('span');
      if (colTexto) {
        const nombre = colTexto.textContent.toLowerCase();
        fila.style.display = nombre.includes(filtro) ? 'grid' : 'none';
      }
    }
  });
}

// Cargar tabla al iniciar
renderizarTabla();
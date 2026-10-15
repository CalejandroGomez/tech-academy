// Elementos del formulario y lista de notas
const formDocente = document.getElementById('form-docente');
const inputNombre = document.getElementById('nuevo-nombre');
const inputNota2 = document.getElementById('nueva-nota2');
const inputNota3 = document.getElementById('nueva-nota3');
const inputFecha = document.getElementById('nueva-fecha');
const contenedorLista = document.getElementById('listaEstudiantes');
const btnSubmitDocente = document.getElementById('btn-submit-docente');
const btnCancelarDocente = document.getElementById('btn-cancelar-docente');
const botonCerrar = document.querySelector('.boton-guardar');

// Variable para saber si estamos editando o creando un nuevo registro
let indiceDocenteEditando = null;

// Datos iniciales si aún no hay nada en localStorage
const calificacionesIniciales = [
  { nombre: "Sebastián Ramírez", nota2: "4.2", nota3: "4.8", fecha: "2026-10-10" },
  { nombre: "Valeria Herrera", nota2: "3.5", nota3: "4.0", fecha: "2026-10-11" },
  { nombre: "Alejandro Morales", nota2: "4.0", nota3: "3.9", fecha: "2026-10-12" }
];

let calificaciones = JSON.parse(localStorage.getItem('calificaciones_docentes')) || calificacionesIniciales;

// Guardar en localStorage
function guardarCalificaciones() {
  localStorage.setItem('calificaciones_docentes', JSON.stringify(calificaciones));
}

// Muestra las calificaciones en la tabla
function renderizarCalificaciones() {
  if (!contenedorLista) return;

  contenedorLista.innerHTML = '';

  // Contenedor de la tabla
  const tablaContenedor = document.createElement('div');
  tablaContenedor.classList.add('tabla-contenedor');

  // Encabezado de columnas
  const encabezado = document.createElement('div');
  encabezado.classList.add('fila-docente', 'encabezado-tabla-docente');

  const titNombre = document.createElement('span');
  titNombre.textContent = 'Nombre';

  const titNota2 = document.createElement('span');
  titNota2.textContent = 'Nota 2';

  const titNota3 = document.createElement('span');
  titNota3.textContent = 'Nota 3';

  const titFecha = document.createElement('span');
  titFecha.textContent = 'Fecha';

  const titAcciones = document.createElement('span');
  titAcciones.textContent = 'Acciones';

  encabezado.appendChild(titNombre);
  encabezado.appendChild(titNota2);
  encabezado.appendChild(titNota3);
  encabezado.appendChild(titFecha);
  encabezado.appendChild(titAcciones);

  tablaContenedor.appendChild(encabezado);

  // Recorrer las notas para crear las filas
  for (let indice = 0; indice < calificaciones.length; indice++) {
    const registro = calificaciones[indice];

    const fila = document.createElement('div');
    fila.classList.add('fila-docente');

    const colNombre = document.createElement('span');
    colNombre.textContent = registro.nombre;

    const colNota2 = document.createElement('span');
    colNota2.textContent = registro.nota2;

    const colNota3 = document.createElement('span');
    colNota3.textContent = registro.nota3;

    const colFecha = document.createElement('span');
    colFecha.textContent = registro.fecha;

    const colAcciones = document.createElement('span');

    // Cargar datos en el formulario para editar
    const btnEditar = document.createElement('button');
    btnEditar.type = 'button';
    btnEditar.classList.add('btn-editar-docente');
    btnEditar.textContent = 'Editar';

    btnEditar.addEventListener('click', function () {
      inputNombre.value = registro.nombre;
      inputNota2.value = registro.nota2;
      inputNota3.value = registro.nota3;
      inputFecha.value = registro.fecha;

      indiceDocenteEditando = indice;
      if (btnSubmitDocente) {
        btnSubmitDocente.textContent = 'Actualizar';
      }
      if (btnCancelarDocente) {
        btnCancelarDocente.style.display = 'inline-block';
      }
    });

    // Eliminar fila de calificaciones
    const btnBorrar = document.createElement('button');
    btnBorrar.type = 'button';
    btnBorrar.classList.add('btn-borrar-docente');
    btnBorrar.textContent = 'Borrar';

    btnBorrar.addEventListener('click', function () {
      if (confirm(`¿Seguro que deseas eliminar las notas de ${registro.nombre}?`)) {
        if (indiceDocenteEditando === indice) {
          cancelarEdicionDocente();
        }
        calificaciones.splice(indice, 1);
        guardarCalificaciones();
        renderizarCalificaciones();
      }
    });

    colAcciones.appendChild(btnEditar);
    colAcciones.appendChild(btnBorrar);

    fila.appendChild(colNombre);
    fila.appendChild(colNota2);
    fila.appendChild(colNota3);
    fila.appendChild(colFecha);
    fila.appendChild(colAcciones);

    tablaContenedor.appendChild(fila);
  }

  contenedorLista.appendChild(tablaContenedor);
}

// Limpiar campos y volver al botón de añadir
function cancelarEdicionDocente() {
  indiceDocenteEditando = null;
  if (formDocente) {
    formDocente.reset();
  }
  if (btnSubmitDocente) {
    btnSubmitDocente.textContent = 'Añadir';
  }
  if (btnCancelarDocente) {
    btnCancelarDocente.style.display = 'none';
  }
}

// Guardar o actualizar datos al enviar el formulario
if (formDocente) {
  formDocente.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nombre = inputNombre.value.trim();
    const nota2 = inputNota2.value.trim();
    const nota3 = inputNota3.value.trim();
    const fecha = inputFecha.value;

    if (!nombre || !nota2 || !nota3 || !fecha) {
      alert('Por favor completa todos los campos de calificación.');
      return;
    }

    const nuevoRegistro = {
      nombre: nombre,
      nota2: nota2,
      nota3: nota3,
      fecha: fecha
    };

    if (indiceDocenteEditando !== null) {
      calificaciones[indiceDocenteEditando] = nuevoRegistro;
      cancelarEdicionDocente();
    } else {
      calificaciones.push(nuevoRegistro);
      formDocente.reset();
    }

    guardarCalificaciones();
    renderizarCalificaciones();
  });
}

// Botón cancelar edición
if (btnCancelarDocente) {
  btnCancelarDocente.addEventListener('click', function () {
    cancelarEdicionDocente();
  });
}

// Cerrar sesión y volver al inicio
function cerrarSesion() {
  localStorage.removeItem('usuarioActivo');
  window.location.href = 'index.html';
}

if (botonCerrar) {
  botonCerrar.addEventListener('click', cerrarSesion);
}

// Inicializar la tabla al cargar la página
renderizarCalificaciones();
// Elementos generales del panel
const saludoDocente = document.getElementById("saludo-docente");
const btnSalirProfesor = document.getElementById("btn-salir-profesor");
const inputBuscar = document.getElementById("buscar");
const btnGuardar = document.getElementById("btnGuardar");
const mensajePanel = document.getElementById("mensaje-panel-profesor");

// Tarjetas de indicadores del curso
const indPromedioCurso = document.getElementById("ind-promedio-curso");
const indPorcentajeCurso = document.getElementById("ind-porcentaje-curso");
const indEntregados = document.getElementById("ind-entregados");
const indPendientes = document.getElementById("ind-pendientes");
const indRevision = document.getElementById("ind-revision");
const indAsistenciaGral = document.getElementById("ind-asistencia-gral");
const indPresentesHoy = document.getElementById("ind-presentes-hoy");
const indAlertas = document.getElementById("ind-alertas");

// Elementos del formulario y tablas
const contenedorEstudiantes = document.getElementById("contenedor-estudiantes");
const formEstudiante = document.getElementById("form-estudiante");
const inputNombre = document.getElementById("nuevo-nombre");
const selectEstado = document.getElementById("nuevo-estado");
const inputNota1 = document.getElementById("nueva-nota1");
const inputNota2 = document.getElementById("nueva-nota2");
const inputNota3 = document.getElementById("nueva-nota3");
const btnSubmitEstudiante = document.getElementById("btn-submit-estudiante");
const btnCancelarEdicion = document.getElementById("btn-cancelar-edicion");

const contenedorAsistencia = document.getElementById("contenedor-asistencia");
const contadorPresentes = document.getElementById("contador-presentes");
const contadorAusentes = document.getElementById("contador-ausentes");

// Posición del estudiante que se está editando
let indiceEditando = null;

// Listas de calificaciones y asistencia (se cargan desde localStorage o mediante fetch)
let listaCalificaciones =
  JSON.parse(localStorage.getItem("calificaciones_academicas")) || [];

let listaAsistencias =
  JSON.parse(localStorage.getItem("asistencias_academicas")) || [];

// FETCH
async function cargarUsuarios() {
  try {
    const respuesta = await fetch("alumnos.json");
    const alumnos = await respuesta.json();
    console.log("Los usuarios recuperados son: ", alumnos);

    if (listaCalificaciones.length === 0) {
      listaCalificaciones = alumnos;
      localStorage.setItem("calificaciones_academicas", JSON.stringify(listaCalificaciones));
    }

    if (listaAsistencias.length === 0) {
      listaAsistencias = alumnos;
      localStorage.setItem("asistencias_academicas", JSON.stringify(listaAsistencias));
    }

    renderizarTablaCalificaciones();
    renderizarTablaAsistencia();
    actualizarIndicadoresGenerales();
  } catch (error) {
    console.error(error);
  }
}

cargarUsuarios();

// Mostrar el nombre del docente en el encabezado
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
if (usuarioActivo && usuarioActivo.rol === "docente") {
  saludoDocente.textContent = usuarioActivo.nombre;
} else {
  saludoDocente.textContent = "Profesor Diego";
}

// Calcular el promedio de las 3 notas de un estudiante
function calcularPromedioEstudiante(estudiante) {
  const n1 = parseFloat(estudiante.nota1) || 0;
  const n2 = parseFloat(estudiante.nota2) || 0;
  const n3 = parseFloat(estudiante.nota3) || 0;
  return ((n1 + n2 + n3) / 3).toFixed(1);
}

// Calcular el porcentaje de asistencia de un estudiante
function calcularPorcentajeAsistencia(registro) {
  if (!registro.totales || registro.totales <= 0) {
    return 0;
  }
  return parseInt((registro.asistidas / registro.totales) * 100);
}

// Guardar calificaciones y asistencias en localStorage
function guardarTodoEnStorage() {
  localStorage.setItem("calificaciones_academicas", JSON.stringify(listaCalificaciones));
  localStorage.setItem("asistencias_academicas", JSON.stringify(listaAsistencias));
}

// Mostrar mensaje temporal en el panel
function mostrarAvisoPanel(texto) {
  mensajePanel.textContent = texto;
  setTimeout(function () {
    mensajePanel.textContent = "";
  }, 3000);
}

// Dibujar las filas de la tabla de calificaciones
function renderizarTablaCalificaciones() {
  contenedorEstudiantes.innerHTML = "";

  for (let indice = 0; indice < listaCalificaciones.length; indice++) {
    const estudiante = listaCalificaciones[indice];
    const promedio = calcularPromedioEstudiante(estudiante);

    let claseEstado = "estado-revision";
    if (estudiante.estado === "Entregado") {
      claseEstado = "estado-aprobado";
    } else if (estudiante.estado === "Pendiente") {
      claseEstado = "estado-pendiente";
    }

    const clasePromedio = parseFloat(promedio) >= 3.0 ? "estado-aprobado" : "estado-pendiente";

    const fila = document.createElement("div");
    fila.classList.add("fila", "fila-calificaciones");
    fila.innerHTML = `
      <span>${estudiante.nombre}</span>
      <span class="${claseEstado}">${estudiante.estado}</span>
      <span>${estudiante.nota1}</span>
      <span>${estudiante.nota2}</span>
      <span>${estudiante.nota3}</span>
      <span class="${clasePromedio}">${promedio}</span>
      <span>
        <button class="btn-editar">Editar</button>
        <button class="btn-Borrar">Borrar</button>
      </span>
    `;

    // Pasar datos al formulario para editarlos
    fila.querySelector(".btn-editar").addEventListener("click", function () {
      inputNombre.value = estudiante.nombre;
      selectEstado.value = estudiante.estado;
      inputNota1.value = estudiante.nota1;
      inputNota2.value = estudiante.nota2;
      inputNota3.value = estudiante.nota3;

      indiceEditando = indice;
      btnSubmitEstudiante.textContent = "Actualizar";
      btnCancelarEdicion.style.display = "inline-block";
    });

    // Eliminar registro de calificaciones
    fila.querySelector(".btn-Borrar").addEventListener("click", function () {
      if (confirm(`¿Seguro que deseas eliminar las calificaciones de ${estudiante.nombre}?`)) {
        if (indiceEditando === indice) {
          cancelarEdicion();
        }
        listaCalificaciones.splice(indice, 1);
        guardarTodoEnStorage();
        renderizarTablaCalificaciones();
        actualizarIndicadoresGenerales();
      }
    });

    contenedorEstudiantes.appendChild(fila);
  }
}

// Volver el formulario al estado inicial
function cancelarEdicion() {
  indiceEditando = null;
  formEstudiante.reset();
  btnSubmitEstudiante.textContent = "Añadir";
  btnCancelarEdicion.style.display = "none";
}

// Agregar un estudiante o guardar cambios de edición
formEstudiante.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nombre = inputNombre.value.trim();
  const estado = selectEstado.value;
  const nota1 = parseFloat(inputNota1.value);
  const nota2 = parseFloat(inputNota2.value);
  const nota3 = parseFloat(inputNota3.value);

  if (!nombre || isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
    mostrarAvisoPanel("Por favor completa el nombre y las 3 notas.");
    return;
  }

  const registro = {
    nombre: nombre,
    estado: estado,
    nota1: nota1.toFixed(1),
    nota2: nota2.toFixed(1),
    nota3: nota3.toFixed(1)
  };

  if (indiceEditando !== null) {
    listaCalificaciones[indiceEditando] = registro;
    cancelarEdicion();
    mostrarAvisoPanel(`Calificaciones de ${nombre} actualizadas.`);
  } else {
    listaCalificaciones.push(registro);
    listaAsistencias.push({
      nombre: nombre,
      fecha: "2026-11-08",
      presenteHoy: true,
      asistidas: 1,
      totales: 1
    });
    formEstudiante.reset();
    mostrarAvisoPanel(`Estudiante ${nombre} añadido al registro.`);
  }

  guardarTodoEnStorage();
  renderizarTablaCalificaciones();
  renderizarTablaAsistencia();
  actualizarIndicadoresGenerales();
});

btnCancelarEdicion.addEventListener("click", cancelarEdicion);

// Dibujar las filas de la tabla de asistencia
function renderizarTablaAsistencia() {
  contenedorAsistencia.innerHTML = "";

  for (let indice = 0; indice < listaAsistencias.length; indice++) {
    const registro = listaAsistencias[indice];
    const porcentaje = calcularPorcentajeAsistencia(registro);

    const textoHoy = registro.presenteHoy ? "Presente" : "Ausente";
    const claseHoy = registro.presenteHoy ? "estado-aprobado" : "estado-pendiente";
    const clasePorcentaje = porcentaje >= 75 ? "estado-aprobado" : "estado-pendiente";
    const atributoCheck = registro.presenteHoy ? "checked" : "";

    const fila = document.createElement("div");
    fila.classList.add("fila", "fila-asistencia");
    fila.innerHTML = `
      <span>${registro.nombre}</span>
      <span>${registro.fecha}</span>
      <span>
        <label class="label-asistencia-check">
          <input type="checkbox" class="check-asistencia-hoy" ${atributoCheck} />
          <span class="${claseHoy}"> ${textoHoy}</span>
        </label>
      </span>
      <span class="control-contador-asistencia">
        <button type="button" class="btn-contador btn-restar">-</button>
        <strong class="numero-sesiones">${registro.asistidas} / ${registro.totales}</strong>
        <button type="button" class="btn-contador btn-sumar">+</button>
      </span>
      <span class="${clasePorcentaje}">${porcentaje}%</span>
      <span>
        <button class="btn-Borrar">Borrar</button>
      </span>
    `;

    // Marcar o desmarcar asistencia del día
    const checkPresente = fila.querySelector(".check-asistencia-hoy");
    checkPresente.addEventListener("change", function () {
      registro.presenteHoy = checkPresente.checked;
      if (checkPresente.checked && registro.asistidas < registro.totales) {
        registro.asistidas++;
      } else if (!checkPresente.checked && registro.asistidas > 0) {
        registro.asistidas--;
      }
      guardarTodoEnStorage();
      renderizarTablaAsistencia();
      actualizarIndicadoresGenerales();
    });

    // Disminuir sesiones asistidas
    fila.querySelector(".btn-restar").addEventListener("click", function () {
      if (registro.asistidas > 0) {
        registro.asistidas--;
        guardarTodoEnStorage();
        renderizarTablaAsistencia();
        actualizarIndicadoresGenerales();
      }
    });

    // Aumentar sesiones asistidas
    fila.querySelector(".btn-sumar").addEventListener("click", function () {
      if (registro.asistidas < registro.totales) {
        registro.asistidas++;
      } else {
        registro.totales++;
        registro.asistidas++;
      }
      guardarTodoEnStorage();
      renderizarTablaAsistencia();
      actualizarIndicadoresGenerales();
    });

    // Eliminar registro de asistencia
    fila.querySelector(".btn-Borrar").addEventListener("click", function () {
      if (confirm(`¿Eliminar el registro de asistencia de ${registro.nombre}?`)) {
        listaAsistencias.splice(indice, 1);
        guardarTodoEnStorage();
        renderizarTablaAsistencia();
        actualizarIndicadoresGenerales();
      }
    });

    contenedorAsistencia.appendChild(fila);
  }

  actualizarContadoresSesion();
}

// Actualizar el conteo de presentes y ausentes de la sesión
function actualizarContadoresSesion() {
  const totalEnLista = document.querySelectorAll("#contenedor-asistencia .fila-asistencia").length;
  const marcadosPresentes = document.querySelectorAll(
    '#contenedor-asistencia input[type="checkbox"]:checked'
  ).length;
  const ausentesHoy = totalEnLista - marcadosPresentes;

  contadorPresentes.textContent = marcadosPresentes;
  contadorAusentes.textContent = ausentesHoy;
  indPresentesHoy.textContent = `Presentes hoy: ${marcadosPresentes}/${totalEnLista}`;
}

// Calcular y mostrar los indicadores generales del curso
function actualizarIndicadoresGenerales() {
  let sumaPromedios = 0;
  let entregados = 0;
  let pendientes = 0;
  let enRevision = 0;
  let alertas = 0;

  for (let est of listaCalificaciones) {
    const prom = parseFloat(calcularPromedioEstudiante(est));
    sumaPromedios += prom;

    if (prom < 3.0) alertas++;

    if (est.estado === "Entregado") {
      entregados++;
    } else if (est.estado === "Pendiente") {
      pendientes++;
    } else {
      enRevision++;
    }
  }

  const totalNotas = listaCalificaciones.length;
  const promedioGeneral = totalNotas > 0 ? (sumaPromedios / totalNotas).toFixed(1) : "0.0";
  const porcentajeEquivalente = totalNotas > 0 ? parseInt((parseFloat(promedioGeneral) / 5) * 100) : 0;

  indPromedioCurso.textContent = promedioGeneral;
  indPromedioCurso.setAttribute(
    "class",
    parseFloat(promedioGeneral) >= 3.0 ? "estado-aprobado" : "estado-pendiente"
  );
  indPorcentajeCurso.textContent = `Equivalente: ${porcentajeEquivalente}%`;
  indEntregados.textContent = entregados;
  indPendientes.textContent = pendientes;
  indRevision.textContent = enRevision;

  let sumaAsist = 0;
  for (let reg of listaAsistencias) {
    sumaAsist += calcularPorcentajeAsistencia(reg);
  }

  const totalAsist = listaAsistencias.length;
  const asistenciaGeneral = totalAsist > 0 ? parseInt(sumaAsist / totalAsist) : 0;

  indAsistenciaGral.textContent = `${asistenciaGeneral}%`;
  indAsistenciaGral.setAttribute(
    "class",
    asistenciaGeneral >= 75 ? "estado-aprobado" : "estado-pendiente"
  );

  indAlertas.textContent = alertas;
  indAlertas.setAttribute("class", alertas > 0 ? "estado-pendiente" : "estado-aprobado");
}

// Filtrar estudiantes por nombre en ambas tablas
inputBuscar.addEventListener("input", function () {
  const filtro = inputBuscar.value.toLowerCase().trim();
  const todasLasFilas = document.querySelectorAll(
    "#contenedor-estudiantes .fila, #contenedor-asistencia .fila"
  );

  for (let fila of todasLasFilas) {
    const colNombre = fila.querySelector("span");
    const nombre = colNombre.textContent.toLowerCase();
    fila.style.display = nombre.includes(filtro) ? "grid" : "none";
  }
});

// Guardar manualmente y cerrar sesión
btnGuardar.addEventListener("click", function () {
  guardarTodoEnStorage();
  mostrarAvisoPanel("¡Calificaciones y asistencias guardadas en LocalStorage!");
});

btnSalirProfesor.addEventListener("click", function () {
  localStorage.removeItem("usuarioActivo");
});

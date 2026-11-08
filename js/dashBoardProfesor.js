// Referencias generales del panel
const saludoDocente = document.getElementById("saludo-docente");
const btnSalirProfesor = document.getElementById("btn-salir-profesor");
const inputBuscar = document.getElementById("buscar");
const btnGuardar = document.getElementById("btnGuardar");
const mensajePanel = document.getElementById("mensaje-panel-profesor");

// Pestañas para alternar entre Calificaciones, Asistencia o Ambos
const tabCalificaciones = document.getElementById("tab-calificaciones");
const tabAsistencia = document.getElementById("tab-asistencia");
const tabAmbos = document.getElementById("tab-ambos");
const moduloCalificaciones = document.getElementById("modulo-calificaciones");
const moduloAsistencia = document.getElementById("modulo-asistencia");

// Referencias de indicadores superiores (KPIs)
const indPromedioCurso = document.getElementById("ind-promedio-curso");
const indPorcentajeCurso = document.getElementById("ind-porcentaje-curso");
const indEntregados = document.getElementById("ind-entregados");
const indPendientes = document.getElementById("ind-pendientes");
const indRevision = document.getElementById("ind-revision");
const indAsistenciaGral = document.getElementById("ind-asistencia-gral");
const indPresentesHoy = document.getElementById("ind-presentes-hoy");
const indAlertas = document.getElementById("ind-alertas");

// Referencias del Módulo 1: Calificaciones
const contenedorEstudiantes = document.getElementById("contenedor-estudiantes");
const formEstudiante = document.getElementById("form-estudiante");
const inputNombre = document.getElementById("nuevo-nombre");
const selectEstado = document.getElementById("nuevo-estado");
const inputNota1 = document.getElementById("nueva-nota1");
const inputNota2 = document.getElementById("nueva-nota2");
const inputNota3 = document.getElementById("nueva-nota3");
const btnSubmitEstudiante = document.getElementById("btn-submit-estudiante");
const btnCancelarEdicion = document.getElementById("btn-cancelar-edicion");

// Referencias del Módulo 2: Asistencia por Sesión
const contenedorAsistencia = document.getElementById("contenedor-asistencia");
const formAsistencia = document.getElementById("form-asistencia");
const inputFechaSesion = document.getElementById("fecha-sesion");
const inputNombreAsistencia = document.getElementById("nombre-asistencia");
const selectEstadoAsistencia = document.getElementById("estado-asistencia-inicial");
const btnNuevaSesion = document.getElementById("btn-nueva-sesion");
const contadorPresentes = document.getElementById("contador-presentes");
const contadorAusentes = document.getElementById("contador-ausentes");

// Estado de edición en la tabla de calificaciones
let indiceEditando = null;

// Los 5 estudiantes por defecto en Calificaciones
const calificacionesPorDefecto = [
  { nombre: "Mariana Gómez", estado: "Entregado", nota1: "4.6", nota2: "4.4", nota3: "4.5" },
  { nombre: "Carlos Restrepo", estado: "En revisión", nota1: "3.8", nota2: "3.6", nota3: "4.0" },
  { nombre: "Luisa Fernández", estado: "Pendiente", nota1: "2.5", nota2: "2.8", nota3: "2.2" },
  { nombre: "Sebastián Ramírez", estado: "Entregado", nota1: "4.2", nota2: "4.5", nota3: "4.8" },
  { nombre: "Juan Camilo Montoya", estado: "Entregado", nota1: "4.2", nota2: "4.0", nota3: "4.4" }
];

// Los 5 estudiantes por defecto en Asistencia por Sesión
const asistenciasPorDefecto = [
  { nombre: "Mariana Gómez", fecha: "2026-11-08", presenteHoy: true, asistidas: 19, totales: 20 },
  { nombre: "Carlos Restrepo", fecha: "2026-11-08", presenteHoy: true, asistidas: 17, totales: 20 },
  { nombre: "Luisa Fernández", fecha: "2026-11-08", presenteHoy: false, asistidas: 14, totales: 20 },
  { nombre: "Sebastián Ramírez", fecha: "2026-11-08", presenteHoy: true, asistidas: 18, totales: 20 },
  { nombre: "Juan Camilo Montoya", fecha: "2026-11-08", presenteHoy: true, asistidas: 16, totales: 20 }
];

// Cargar listas desde localStorage o usar las listas por defecto
let listaCalificaciones =
  JSON.parse(localStorage.getItem("calificaciones_academicas")) || calificacionesPorDefecto;

let listaAsistencias =
  JSON.parse(localStorage.getItem("asistencias_academicas")) || asistenciasPorDefecto;

// Mostrar nombre del docente que inició sesión
function mostrarUsuarioActivo() {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (usuarioActivo && usuarioActivo.rol === "docente" && saludoDocente) {
    saludoDocente.textContent = usuarioActivo.nombre;
  } else if (saludoDocente) {
    saludoDocente.textContent = "Profesor Diego";
  }
}

// Calcula el promedio de las 3 notas de un estudiante
function calcularPromedioEstudiante(estudiante) {
  const n1 = parseFloat(estudiante.nota1) || 0;
  const n2 = parseFloat(estudiante.nota2) || 0;
  const n3 = parseFloat(estudiante.nota3) || 0;
  const promedio = (n1 + n2 + n3) / 3;
  return promedio.toFixed(1);
}

// Calcula el porcentaje de asistencia de un estudiante
function calcularPorcentajeAsistencia(registroAsistencia) {
  if (!registroAsistencia.totales || registroAsistencia.totales <= 0) {
    return 0;
  }
  const porcentaje = Math.round((registroAsistencia.asistidas / registroAsistencia.totales) * 100);
  return porcentaje;
}

// Guardar ambas listas en localStorage
function guardarTodoEnStorage() {
  localStorage.setItem("calificaciones_academicas", JSON.stringify(listaCalificaciones));
  localStorage.setItem("asistencias_academicas", JSON.stringify(listaAsistencias));
}

// Mostrar aviso suave en el panel (con setTimeout)
function mostrarAvisoPanel(texto) {
  if (!mensajePanel) return;
  mensajePanel.textContent = texto;
  mensajePanel.style.opacity = "1";

  setTimeout(function () {
    mensajePanel.textContent = "";
  }, 3000);
}


// TABLA DE CALIFICACIONES

function renderizarTablaCalificaciones() {
  if (!contenedorEstudiantes) return;
  contenedorEstudiantes.innerHTML = "";

  for (let indice = 0; indice < listaCalificaciones.length; indice++) {
    const estudiante = listaCalificaciones[indice];
    const promedio = calcularPromedioEstudiante(estudiante);

    const fila = document.createElement("div");
    fila.classList.add("fila", "fila-calificaciones");

    const colNombre = document.createElement("span");
    colNombre.textContent = estudiante.nombre;

    const colEstado = document.createElement("span");
    colEstado.textContent = estudiante.estado;
    colEstado.classList.add("etiqueta-estado");
    if (estudiante.estado === "Entregado") {
      colEstado.style.color = "#1b4d20";
    } else if (estudiante.estado === "Pendiente") {
      colEstado.style.color = "#8b0000";
    } else {
      colEstado.style.color = "#7a5200";
    }

    const colNota1 = document.createElement("span");
    colNota1.textContent = estudiante.nota1;

    const colNota2 = document.createElement("span");
    colNota2.textContent = estudiante.nota2;

    const colNota3 = document.createElement("span");
    colNota3.textContent = estudiante.nota3;

    const colPromedio = document.createElement("span");
    colPromedio.textContent = promedio;
    colPromedio.style.fontWeight = "bold";
    if (parseFloat(promedio) >= 3.0) {
      colPromedio.style.color = "#1b4d20";
    } else {
      colPromedio.style.color = "#8b0000";
    }

    const colAccion = document.createElement("span");

    // Botón Editar
    const btnEditar = document.createElement("button");
    btnEditar.classList.add("btn-editar");
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", function () {
      inputNombre.value = estudiante.nombre;
      selectEstado.value = estudiante.estado;
      inputNota1.value = estudiante.nota1;
      inputNota2.value = estudiante.nota2;
      inputNota3.value = estudiante.nota3;

      indiceEditando = indice;
      if (btnSubmitEstudiante) {
        btnSubmitEstudiante.textContent = "Actualizar";
      }
      if (btnCancelarEdicion) {
        btnCancelarEdicion.style.display = "inline-block";
      }
    });

    // Botón Borrar
    const btnBorrar = document.createElement("button");
    btnBorrar.classList.add("btn-Borrar");
    btnBorrar.textContent = "Borrar";
    btnBorrar.addEventListener("click", function () {
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

    colAccion.appendChild(btnEditar);
    colAccion.appendChild(btnBorrar);

    fila.appendChild(colNombre);
    fila.appendChild(colEstado);
    fila.appendChild(colNota1);
    fila.appendChild(colNota2);
    fila.appendChild(colNota3);
    fila.appendChild(colPromedio);
    fila.appendChild(colAccion);

    contenedorEstudiantes.appendChild(fila);
  }

  aplicarFiltroBusqueda();
}

function cancelarEdicion() {
  indiceEditando = null;
  if (formEstudiante) {
    formEstudiante.reset();
  }
  if (btnSubmitEstudiante) {
    btnSubmitEstudiante.textContent = "Añadir";
  }
  if (btnCancelarEdicion) {
    btnCancelarEdicion.style.display = "none";
  }
}

// Evento submit del formulario de Calificaciones
if (formEstudiante) {
  formEstudiante.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = inputNombre.value.trim();
    const estado = selectEstado.value;
    const nota1 = parseFloat(inputNota1.value);
    const nota2 = parseFloat(inputNota2.value);
    const nota3 = parseFloat(inputNota3.value);

    if (!nombre || isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
      mostrarAvisoPanel("Por favor completa el nombre y las 3 notas válidas (0.0 a 5.0).");
      return;
    }

    if (nota1 < 0 || nota1 > 5 || nota2 < 0 || nota2 > 5 || nota3 < 0 || nota3 > 5) {
      mostrarAvisoPanel("Las notas deben estar entre 0.0 y 5.0.");
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

      // Si no está aún en la lista de asistencia, lo agregamos también
      let existeEnAsistencia = false;
      for (let item of listaAsistencias) {
        if (item.nombre.toLowerCase() === nombre.toLowerCase()) {
          existeEnAsistencia = true;
          break;
        }
      }
      if (!existeEnAsistencia) {
        listaAsistencias.push({
          nombre: nombre,
          fecha: inputFechaSesion ? inputFechaSesion.value : "2026-11-08",
          presenteHoy: true,
          asistidas: 1,
          totales: 1
        });
      }

      formEstudiante.reset();
      mostrarAvisoPanel(`Estudiante ${nombre} añadido al registro.`);
    }

    guardarTodoEnStorage();
    renderizarTablaCalificaciones();
    renderizarTablaAsistencia();
    actualizarIndicadoresGenerales();
  });
}

if (btnCancelarEdicion) {
  btnCancelarEdicion.addEventListener("click", function () {
    cancelarEdicion();
  });
}


// CONTROL DE ASISTENCIA POR SESIÓN

function renderizarTablaAsistencia() {
  if (!contenedorAsistencia) return;
  contenedorAsistencia.innerHTML = "";

  for (let indice = 0; indice < listaAsistencias.length; indice++) {
    const registro = listaAsistencias[indice];
    const porcentaje = calcularPorcentajeAsistencia(registro);

    const fila = document.createElement("div");
    fila.classList.add("fila", "fila-asistencia");

    // 1. Nombre
    const colNombre = document.createElement("span");
    colNombre.textContent = registro.nombre;

    // 2. Fecha de sesión
    const colFecha = document.createElement("span");
    colFecha.textContent = registro.fecha;

    // 3. Checkbox de asistencia en la sesión actual (práctica Todo)
    const colPresente = document.createElement("span");
    const labelCheck = document.createElement("label");
    labelCheck.classList.add("label-asistencia-check");

    const checkPresente = document.createElement("input");
    checkPresente.type = "checkbox";
    checkPresente.classList.add("check-asistencia-hoy");
    checkPresente.checked = registro.presenteHoy;

    const textoEstadoHoy = document.createElement("span");
    textoEstadoHoy.textContent = registro.presenteHoy ? " Presente" : " Ausente";
    textoEstadoHoy.style.color = registro.presenteHoy ? "#1b4d20" : "#8b0000";
    textoEstadoHoy.style.fontWeight = "bold";

    checkPresente.addEventListener("change", function () {
      registro.presenteHoy = checkPresente.checked;
      if (checkPresente.checked) {
        if (registro.asistidas < registro.totales) {
          registro.asistidas++;
        }
      } else {
        if (registro.asistidas > 0) {
          registro.asistidas--;
        }
      }
      guardarTodoEnStorage();
      renderizarTablaAsistencia();
      actualizarIndicadoresGenerales();
    });

    labelCheck.appendChild(checkPresente);
    labelCheck.appendChild(textoEstadoHoy);
    colPresente.appendChild(labelCheck);

    // 4. Contador de Sesiones Asistidas / Totales (práctica Contador)
    const colContador = document.createElement("span");
    colContador.classList.add("control-contador-asistencia");

    const btnDisminuir = document.createElement("button");
    btnDisminuir.type = "button";
    btnDisminuir.classList.add("btn-contador");
    btnDisminuir.textContent = "-";
    btnDisminuir.title = "Disminuir asistencia";
    btnDisminuir.addEventListener("click", function () {
      if (registro.asistidas > 0) {
        registro.asistidas--;
        guardarTodoEnStorage();
        renderizarTablaAsistencia();
        actualizarIndicadoresGenerales();
      }
    });

    const textoCuenta = document.createElement("strong");
    textoCuenta.classList.add("numero-sesiones");
    textoCuenta.textContent = `${registro.asistidas} / ${registro.totales}`;

    const btnAumentar = document.createElement("button");
    btnAumentar.type = "button";
    btnAumentar.classList.add("btn-contador");
    btnAumentar.textContent = "+";
    btnAumentar.title = "Aumentar asistencia";
    btnAumentar.addEventListener("click", function () {
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

    colContador.appendChild(btnDisminuir);
    colContador.appendChild(textoCuenta);
    colContador.appendChild(btnAumentar);

    // 5. Porcentaje de asistencia con cambio de color
    const colPorcentaje = document.createElement("span");
    colPorcentaje.textContent = `${porcentaje}%`;
    colPorcentaje.style.fontWeight = "bold";
    if (porcentaje >= 75) {
      colPorcentaje.style.color = "#1b4d20";
    } else {
      colPorcentaje.style.color = "#8b0000";
    }

    // 6. Acciones
    const colAccion = document.createElement("span");
    const btnBorrar = document.createElement("button");
    btnBorrar.classList.add("btn-Borrar");
    btnBorrar.textContent = "Borrar";
    btnBorrar.addEventListener("click", function () {
      if (confirm(`¿Eliminar el registro de asistencia de ${registro.nombre}?`)) {
        listaAsistencias.splice(indice, 1);
        guardarTodoEnStorage();
        renderizarTablaAsistencia();
        actualizarIndicadoresGenerales();
      }
    });

    colAccion.appendChild(btnBorrar);

    fila.appendChild(colNombre);
    fila.appendChild(colFecha);
    fila.appendChild(colPresente);
    fila.appendChild(colContador);
    fila.appendChild(colPorcentaje);
    fila.appendChild(colAccion);

    contenedorAsistencia.appendChild(fila);
  }

  actualizarContadoresSesionTodo();
  aplicarFiltroBusqueda();
}

// Contar checkboxes marcados y pendientes (como en curso/todo/JS/app.js)
function actualizarContadoresSesionTodo() {
  const totalEnLista = document.querySelectorAll("#contenedor-asistencia .fila-asistencia").length;
  const marcadosPresentes = document.querySelectorAll(
    '#contenedor-asistencia input[type="checkbox"]:checked'
  ).length;
  const ausentesHoy = totalEnLista - marcadosPresentes;

  if (contadorPresentes) {
    contadorPresentes.textContent = marcadosPresentes;
  }
  if (contadorAusentes) {
    contadorAusentes.textContent = ausentesHoy;
  }
  if (indPresentesHoy) {
    indPresentesHoy.textContent = `Presentes hoy: ${marcadosPresentes}/${totalEnLista}`;
  }
}

// Formulario de Asistencia
if (formAsistencia) {
  formAsistencia.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const fechaSeleccionada = inputFechaSesion.value;
    const nombreNuevo = inputNombreAsistencia.value.trim();
    const estadoInicial = selectEstadoAsistencia.value === "presente";

    if (!fechaSeleccionada) {
      mostrarAvisoPanel("Selecciona una fecha para la sesión.");
      return;
    }

    if (nombreNuevo !== "") {
      let encontrado = null;
      for (let item of listaAsistencias) {
        if (item.nombre.toLowerCase() === nombreNuevo.toLowerCase()) {
          encontrado = item;
          break;
        }
      }

      if (encontrado) {
        encontrado.fecha = fechaSeleccionada;
        encontrado.presenteHoy = estadoInicial;
        mostrarAvisoPanel(`Asistencia de ${encontrado.nombre} actualizada para ${fechaSeleccionada}.`);
      } else {
        listaAsistencias.push({
          nombre: nombreNuevo,
          fecha: fechaSeleccionada,
          presenteHoy: estadoInicial,
          asistidas: estadoInicial ? 1 : 0,
          totales: 1
        });
        mostrarAvisoPanel(`Estudiante ${nombreNuevo} agregado al control de asistencia.`);
      }
      inputNombreAsistencia.value = "";
    } else {
      for (let item of listaAsistencias) {
        item.fecha = fechaSeleccionada;
      }
      mostrarAvisoPanel(`Fecha de sesión actualizada a ${fechaSeleccionada} para todo el grupo.`);
    }

    guardarTodoEnStorage();
    renderizarTablaAsistencia();
    actualizarIndicadoresGenerales();
  });
}

// Botón "+ Nueva Sesión Grupal"
if (btnNuevaSesion) {
  btnNuevaSesion.addEventListener("click", function () {
    const fechaSeleccionada = inputFechaSesion.value || "2026-11-08";

    for (let item of listaAsistencias) {
      item.fecha = fechaSeleccionada;
      item.totales++;
      if (item.presenteHoy) {
        item.asistidas++;
      }
    }

    guardarTodoEnStorage();
    renderizarTablaAsistencia();
    actualizarIndicadoresGenerales();
    mostrarAvisoPanel(`Nueva sesión registrada (${fechaSeleccionada}). Se actualizaron los conteos del grupo.`);
  });
}


// ACTUALIZACIÓN AUTOMÁTICA DE INDICADORES GENERALES (KPIs) EN EL PANEL

function actualizarIndicadoresGenerales() {
  let sumaPromedios = 0;
  let entregados = 0;
  let pendientes = 0;
  let enRevision = 0;
  let estudiantesBajoPromedio = 0;

  for (let est of listaCalificaciones) {
    const prom = parseFloat(calcularPromedioEstudiante(est));
    sumaPromedios += prom;

    if (prom < 3.0) {
      estudiantesBajoPromedio++;
    }

    if (est.estado === "Entregado") {
      entregados++;
    } else if (est.estado === "Pendiente") {
      pendientes++;
    } else {
      enRevision++;
    }
  }

  const totalEstNotas = listaCalificaciones.length;
  const promedioGeneral = totalEstNotas > 0 ? (sumaPromedios / totalEstNotas).toFixed(1) : "0.0";
  const porcentajeEquivalente = totalEstNotas > 0 ? Math.round((parseFloat(promedioGeneral) / 5) * 100) : 0;

  if (indPromedioCurso) {
    indPromedioCurso.textContent = promedioGeneral;
    indPromedioCurso.style.color = parseFloat(promedioGeneral) >= 3.0 ? "#1b4d20" : "#8b0000";
  }
  if (indPorcentajeCurso) {
    indPorcentajeCurso.textContent = `Equivalente: ${porcentajeEquivalente}%`;
  }
  if (indEntregados) indEntregados.textContent = entregados;
  if (indPendientes) indPendientes.textContent = pendientes;
  if (indRevision) indRevision.textContent = enRevision;

  let sumaPorcentajesAsist = 0;
  let estudiantesBajaAsistencia = 0;

  for (let reg of listaAsistencias) {
    const porc = calcularPorcentajeAsistencia(reg);
    sumaPorcentajesAsist += porc;
    if (porc < 75) {
      estudiantesBajaAsistencia++;
    }
  }

  const totalEstAsist = listaAsistencias.length;
  const asistenciaGeneral = totalEstAsist > 0 ? Math.round(sumaPorcentajesAsist / totalEstAsist) : 0;

  if (indAsistenciaGral) {
    indAsistenciaGral.textContent = `${asistenciaGeneral}%`;
    indAsistenciaGral.style.color = asistenciaGeneral >= 75 ? "#1b4d20" : "#8b0000";
  }

  const totalAlertas = Math.max(estudiantesBajoPromedio, estudiantesBajaAsistencia);
  if (indAlertas) {
    indAlertas.textContent = totalAlertas;
    indAlertas.style.color = totalAlertas > 0 ? "#8b0000" : "#1b4d20";
  }
}


// BUSCADOR EN TIEMPO REAL Y NAVEGACIÓN ENTRE PESTAÑAS

function aplicarFiltroBusqueda() {
  if (!inputBuscar) return;
  const filtro = inputBuscar.value.toLowerCase().trim();

  const todasLasFilas = document.querySelectorAll(
    "#contenedor-estudiantes .fila, #contenedor-asistencia .fila"
  );

  for (let fila of todasLasFilas) {
    const colNombre = fila.querySelector("span");
    if (colNombre) {
      const nombre = colNombre.textContent.toLowerCase();
      fila.style.display = nombre.includes(filtro) ? "grid" : "none";
    }
  }
}

if (inputBuscar) {
  inputBuscar.addEventListener("input", aplicarFiltroBusqueda);
}

function cambiarPestana(modo) {
  tabCalificaciones.classList.remove("activa");
  tabAsistencia.classList.remove("activa");
  tabAmbos.classList.remove("activa");

  if (modo === "calificaciones") {
    tabCalificaciones.classList.add("activa");
    moduloCalificaciones.style.display = "block";
    moduloAsistencia.style.display = "none";
  } else if (modo === "asistencia") {
    tabAsistencia.classList.add("activa");
    moduloCalificaciones.style.display = "none";
    moduloAsistencia.style.display = "block";
  } else {
    tabAmbos.classList.add("activa");
    moduloCalificaciones.style.display = "block";
    moduloAsistencia.style.display = "block";
  }
}

if (tabCalificaciones) {
  tabCalificaciones.addEventListener("click", function () {
    cambiarPestana("calificaciones");
  });
}

if (tabAsistencia) {
  tabAsistencia.addEventListener("click", function () {
    cambiarPestana("asistencia");
  });
}

if (tabAmbos) {
  tabAmbos.addEventListener("click", function () {
    cambiarPestana("ambos");
  });
}

if (btnGuardar) {
  btnGuardar.addEventListener("click", function () {
    guardarTodoEnStorage();
    mostrarAvisoPanel("¡Calificaciones y asistencias guardadas exitosamente en LocalStorage!");
  });
}

if (btnSalirProfesor) {
  btnSalirProfesor.addEventListener("click", function () {
    localStorage.removeItem("usuarioActivo");
  });
}

// Inicializar el panel al cargar la página
mostrarUsuarioActivo();
guardarTodoEnStorage();
renderizarTablaCalificaciones();
renderizarTablaAsistencia();
actualizarIndicadoresGenerales();

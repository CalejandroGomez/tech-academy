// ============================================================
// DASHBOARD ALUMNO - Consulta personal de Calificaciones
// y Asistencia (DOM, Eventos y LocalStorage)
// ============================================================

// Referencias del encabezado del aprendiz
const saludoAlumno = document.getElementById("saludo-alumno");
const btnSalirAlumno = document.getElementById("btn-salir-alumno");
const nombreExpediente = document.getElementById("nombre-expediente");

// Referencias de los indicadores (KPIs personales)
const alumnoPromedio = document.getElementById("alumno-promedio");
const alumnoConceptoNota = document.getElementById("alumno-concepto-nota");
const alumnoEstadoEntrega = document.getElementById("alumno-estado-entrega");
const alumnoPorcentajeAsistencia = document.getElementById("alumno-porcentaje-asistencia");
const alumnoDetalleSesiones = document.getElementById("alumno-detalle-sesiones");

// Referencias de contenedores de tablas
const contenedorNotasAlumno = document.getElementById("contenedor-notas-alumno");
const contenedorAsistenciaAlumno = document.getElementById("contenedor-asistencia-alumno");

// Referencias de pestañas de vista
const tabAlumnoNotas = document.getElementById("tab-alumno-notas");
const tabAlumnoAsistencia = document.getElementById("tab-alumno-asistencia");
const tabAlumnoTodo = document.getElementById("tab-alumno-todo");

const seccionAlumnoNotas = document.getElementById("seccion-alumno-notas");
const seccionAlumnoAsistencia = document.getElementById("seccion-alumno-asistencia");

// Los 5 estudiantes por defecto (mismos que en dashBoardProfesor.js)
const calificacionesPorDefecto = [
  { nombre: "Mariana Gómez", estado: "Entregado", nota1: "4.6", nota2: "4.4", nota3: "4.5" },
  { nombre: "Carlos Restrepo", estado: "En revisión", nota1: "3.8", nota2: "3.6", nota3: "4.0" },
  { nombre: "Luisa Fernández", estado: "Pendiente", nota1: "2.5", nota2: "2.8", nota3: "2.2" },
  { nombre: "Sebastián Ramírez", estado: "Entregado", nota1: "4.2", nota2: "4.5", nota3: "4.8" },
  { nombre: "Juan Camilo Montoya", estado: "Entregado", nota1: "4.2", nota2: "4.0", nota3: "4.4" }
];

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

// Obtener el aprendiz que inició sesión
let usuarioGuardado = JSON.parse(localStorage.getItem("usuarioActivo"));
if (!usuarioGuardado || usuarioGuardado.rol !== "aprendiz") {
  usuarioGuardado = {
    nombre: "Mariana Gómez",
    rol: "aprendiz"
  };
}

const estudianteActivo = usuarioGuardado.nombre;

// Asegurar que el aprendiz activo exista en las listas si se acaba de registrar
function asegurarEstudianteEnListas(nombreEst) {
  let existeNota = false;
  for (let item of listaCalificaciones) {
    if (item.nombre.toLowerCase() === nombreEst.toLowerCase()) {
      existeNota = true;
      break;
    }
  }
  if (!existeNota) {
    listaCalificaciones.push({
      nombre: nombreEst,
      estado: "Pendiente",
      nota1: "0.0",
      nota2: "0.0",
      nota3: "0.0"
    });
    localStorage.setItem("calificaciones_academicas", JSON.stringify(listaCalificaciones));
  }

  let existeAsist = false;
  for (let item of listaAsistencias) {
    if (item.nombre.toLowerCase() === nombreEst.toLowerCase()) {
      existeAsist = true;
      break;
    }
  }
  if (!existeAsist) {
    listaAsistencias.push({
      nombre: nombreEst,
      fecha: "2026-11-08",
      presenteHoy: true,
      asistidas: 1,
      totales: 1
    });
    localStorage.setItem("asistencias_academicas", JSON.stringify(listaAsistencias));
  }
}

// Renderizar únicamente las calificaciones y asistencia del estudiante que inició sesión
function mostrarDatosEstudiante(nombreBuscar) {
  if (saludoAlumno) {
    saludoAlumno.textContent = nombreBuscar;
  }
  if (nombreExpediente) {
    nombreExpediente.textContent = nombreBuscar;
  }

  let datosNotas = null;
  for (let item of listaCalificaciones) {
    if (item.nombre.toLowerCase() === nombreBuscar.toLowerCase()) {
      datosNotas = item;
      break;
    }
  }

  let datosAsist = null;
  for (let item of listaAsistencias) {
    if (item.nombre.toLowerCase() === nombreBuscar.toLowerCase()) {
      datosAsist = item;
      break;
    }
  }

  // Mostrar Calificaciones (Momento 1, Momento 2, Momento 3 y Promedio Definitivo)
  if (datosNotas && contenedorNotasAlumno) {
    const n1 = parseFloat(datosNotas.nota1) || 0;
    const n2 = parseFloat(datosNotas.nota2) || 0;
    const n3 = parseFloat(datosNotas.nota3) || 0;
    const promedio = ((n1 + n2 + n3) / 3).toFixed(1);

    if (alumnoPromedio) {
      alumnoPromedio.textContent = promedio;
      alumnoPromedio.style.color = parseFloat(promedio) >= 3.0 ? "#1b4d20" : "#8b0000";
    }
    if (alumnoConceptoNota) {
      alumnoConceptoNota.textContent =
        parseFloat(promedio) >= 3.0 ? "Estado: Aprobando" : "Estado: Por mejorar";
    }
    if (alumnoEstadoEntrega) {
      alumnoEstadoEntrega.textContent = datosNotas.estado;
      if (datosNotas.estado === "Entregado") {
        alumnoEstadoEntrega.style.color = "#1b4d20";
      } else if (datosNotas.estado === "Pendiente") {
        alumnoEstadoEntrega.style.color = "#8b0000";
      } else {
        alumnoEstadoEntrega.style.color = "#7a5200";
      }
    }

    const momentos = [
      { titulo: "Momento 1", nota: n1.toFixed(1), estado: datosNotas.estado },
      { titulo: "Momento 2", nota: n2.toFixed(1), estado: datosNotas.estado },
      { titulo: "Momento 3", nota: n3.toFixed(1), estado: datosNotas.estado },
      { titulo: "PROMEDIO DEFINITIVO", nota: promedio, estado: datosNotas.estado, esFinal: true }
    ];

    contenedorNotasAlumno.innerHTML = "";

    for (let m of momentos) {
      const fila = document.createElement("div");
      fila.classList.add("fila", "fila-alumno-notas");
      if (m.esFinal) {
        fila.style.fontWeight = "bold";
        fila.style.backgroundColor = "rgba(174, 127, 55, 0.2)";
      }

      const colMomento = document.createElement("span");
      colMomento.textContent = m.titulo;

      const colEstado = document.createElement("span");
      colEstado.textContent = m.estado;

      const colNota = document.createElement("span");
      colNota.textContent = m.nota;
      colNota.style.fontWeight = "bold";

      const colValoracion = document.createElement("span");
      const valorNum = parseFloat(m.nota);
      if (valorNum >= 3.0) {
        colValoracion.textContent = "Aprobado";
        colValoracion.style.color = "#1b4d20";
        colNota.style.color = "#1b4d20";
      } else {
        colValoracion.textContent = "Pendiente / Bajo";
        colValoracion.style.color = "#8b0000";
        colNota.style.color = "#8b0000";
      }
      colValoracion.style.fontWeight = "bold";

      fila.appendChild(colMomento);
      fila.appendChild(colEstado);
      fila.appendChild(colNota);
      fila.appendChild(colValoracion);

      contenedorNotasAlumno.appendChild(fila);
    }
  }

  // Mostrar Asistencia
  if (datosAsist && contenedorAsistenciaAlumno) {
    const porcentaje =
      datosAsist.totales > 0 ? Math.round((datosAsist.asistidas / datosAsist.totales) * 100) : 0;

    if (alumnoPorcentajeAsistencia) {
      alumnoPorcentajeAsistencia.textContent = `${porcentaje}%`;
      alumnoPorcentajeAsistencia.style.color = porcentaje >= 75 ? "#1b4d20" : "#8b0000";
    }
    if (alumnoDetalleSesiones) {
      alumnoDetalleSesiones.textContent = `${datosAsist.asistidas} de ${datosAsist.totales} sesiones`;
    }

    contenedorAsistenciaAlumno.innerHTML = "";

    const filaAsist = document.createElement("div");
    filaAsist.classList.add("fila", "fila-alumno-asistencia");

    const colFecha = document.createElement("span");
    colFecha.textContent = datosAsist.fecha;

    const colEstadoHoy = document.createElement("span");
    colEstadoHoy.textContent = datosAsist.presenteHoy ? "Presente" : "Ausente";
    colEstadoHoy.style.fontWeight = "bold";
    colEstadoHoy.style.color = datosAsist.presenteHoy ? "#1b4d20" : "#8b0000";

    const colAsistidas = document.createElement("span");
    colAsistidas.textContent = `${datosAsist.asistidas} clases`;

    const colTotales = document.createElement("span");
    colTotales.textContent = `${datosAsist.totales} sesiones`;

    const colPorcentaje = document.createElement("span");
    colPorcentaje.textContent = `${porcentaje}% (${porcentaje >= 75 ? "Al día" : "Riesgo por inasistencia"})`;
    colPorcentaje.style.fontWeight = "bold";
    colPorcentaje.style.color = porcentaje >= 75 ? "#1b4d20" : "#8b0000";

    filaAsist.appendChild(colFecha);
    filaAsist.appendChild(colEstadoHoy);
    filaAsist.appendChild(colAsistidas);
    filaAsist.appendChild(colTotales);
    filaAsist.appendChild(colPorcentaje);

    contenedorAsistenciaAlumno.appendChild(filaAsist);
  }
}

// ============================================================
// EVENTOS DE PESTAÑAS Y SALIDA
// ============================================================
function cambiarPestanaAlumno(modo) {
  tabAlumnoNotas.classList.remove("activa");
  tabAlumnoAsistencia.classList.remove("activa");
  tabAlumnoTodo.classList.remove("activa");

  if (modo === "notas") {
    tabAlumnoNotas.classList.add("activa");
    seccionAlumnoNotas.style.display = "block";
    seccionAlumnoAsistencia.style.display = "none";
  } else if (modo === "asistencia") {
    tabAlumnoAsistencia.classList.add("activa");
    seccionAlumnoNotas.style.display = "none";
    seccionAlumnoAsistencia.style.display = "block";
  } else {
    tabAlumnoTodo.classList.add("activa");
    seccionAlumnoNotas.style.display = "block";
    seccionAlumnoAsistencia.style.display = "block";
  }
}

if (tabAlumnoNotas) {
  tabAlumnoNotas.addEventListener("click", function () {
    cambiarPestanaAlumno("notas");
  });
}
if (tabAlumnoAsistencia) {
  tabAlumnoAsistencia.addEventListener("click", function () {
    cambiarPestanaAlumno("asistencia");
  });
}
if (tabAlumnoTodo) {
  tabAlumnoTodo.addEventListener("click", function () {
    cambiarPestanaAlumno("todo");
  });
}

if (btnSalirAlumno) {
  btnSalirAlumno.addEventListener("click", function () {
    localStorage.removeItem("usuarioActivo");
  });
}

// Inicializar vista del alumno
asegurarEstudianteEnListas(estudianteActivo);
mostrarDatosEstudiante(estudianteActivo);

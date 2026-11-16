// Elementos del encabezado y los indicadores del aprendiz
const saludoAlumno = document.getElementById("saludo-alumno");
const btnSalirAlumno = document.getElementById("btn-salir-alumno");
const nombreExpediente = document.getElementById("nombre-expediente");

const alumnoPromedio = document.getElementById("alumno-promedio");
const alumnoConceptoNota = document.getElementById("alumno-concepto-nota");
const alumnoEstadoEntrega = document.getElementById("alumno-estado-entrega");
const alumnoPorcentajeAsistencia = document.getElementById("alumno-porcentaje-asistencia");
const alumnoDetalleSesiones = document.getElementById("alumno-detalle-sesiones");

const contenedorNotasAlumno = document.getElementById("contenedor-notas-alumno");
const contenedorAsistenciaAlumno = document.getElementById("contenedor-asistencia-alumno");

// Listas de calificaciones y asistencia
let listaCalificaciones =
  JSON.parse(localStorage.getItem("calificaciones_academicas")) || [];

let listaAsistencias =
  JSON.parse(localStorage.getItem("asistencias_academicas")) || [];

// Aprendiz que inició sesión
let usuarioGuardado = JSON.parse(localStorage.getItem("usuarioActivo"));
if (!usuarioGuardado || usuarioGuardado.rol !== "aprendiz") {
  usuarioGuardado = { nombre: "Usuario", rol: "aprendiz" };
}

const estudianteActivo = usuarioGuardado.nombre;
saludoAlumno.textContent = estudianteActivo;
nombreExpediente.textContent = estudianteActivo;

let datosNotas = null;
let datosAsist = null;

// FETCH
async function cargarUsuarios() {
  try {
    const respuesta = await fetch("alumnos.json");
    const alumnos = await respuesta.json();
    console.log("Los alumnos recuperados del .json son: ", alumnos);
    if (listaCalificaciones.length === 0) {
      listaCalificaciones = alumnos;
      localStorage.setItem("calificaciones_academicas", JSON.stringify(listaCalificaciones));
    }
    if (listaAsistencias.length === 0) {
      listaAsistencias = alumnos;
      localStorage.setItem("asistencias_academicas", JSON.stringify(listaAsistencias));
    }
    // Buscar las notas del aprendiz activo
    for (let item of listaCalificaciones) {
      if (item.nombre.toLowerCase() === estudianteActivo.toLowerCase()) {
        datosNotas = item;
        break;
      }
    }
    // Buscar la asistencia del aprendiz activo
    for (let item of listaAsistencias) {
      if (item.nombre.toLowerCase() === estudianteActivo.toLowerCase()) {
        datosAsist = item;
        break;
      }
    }
    mostrarCalificaciones();
    mostrarAsistencia();
  } catch (error) {
    console.error(error);
  }
}
cargarUsuarios();

// Mostrar calificaciones y promedio del aprendiz activo
function mostrarCalificaciones() {
  const n1 = parseFloat(datosNotas.nota1) || 0;
  const n2 = parseFloat(datosNotas.nota2) || 0;
  const n3 = parseFloat(datosNotas.nota3) || 0;
  const promedio = ((n1 + n2 + n3) / 3).toFixed(1);

  alumnoPromedio.textContent = promedio;
  alumnoPromedio.setAttribute(
    "class",
    parseFloat(promedio) >= 3.0 ? "estado-aprobado" : "estado-pendiente"
  );
  alumnoConceptoNota.textContent =
    parseFloat(promedio) >= 3.0 ? "Estado: Aprobando" : "Estado: Por mejorar";

  alumnoEstadoEntrega.textContent = datosNotas.estado;
  if (datosNotas.estado === "Entregado") {
    alumnoEstadoEntrega.setAttribute("class", "texto-indicador-mediano estado-aprobado");
  } else if (datosNotas.estado === "Pendiente") {
    alumnoEstadoEntrega.setAttribute("class", "texto-indicador-mediano estado-pendiente");
  } else {
    alumnoEstadoEntrega.setAttribute("class", "texto-indicador-mediano estado-revision");
  }

  const momentos = [
    { titulo: "Momento 1", nota: n1.toFixed(1) },
    { titulo: "Momento 2", nota: n2.toFixed(1) },
    { titulo: "Momento 3", nota: n3.toFixed(1) },
    { titulo: "PROMEDIO DEFINITIVO", nota: promedio, esFinal: true }
  ];

  contenedorNotasAlumno.innerHTML = "";

  for (let m of momentos) {
    const aprobado = parseFloat(m.nota) >= 3.0;
    const claseNota = aprobado ? "estado-aprobado" : "estado-pendiente";
    const textoValoracion = aprobado ? "Aprobado" : "Pendiente / Bajo";

    const fila = document.createElement("div");
    fila.classList.add("fila", "fila-alumno-notas");
    if (m.esFinal) {
      fila.classList.add("fila-definitiva");
    }

    fila.innerHTML = `
      <span>${m.titulo}</span>
      <span>${datosNotas.estado}</span>
      <span class="${claseNota}">${m.nota}</span>
      <span class="${claseNota}">${textoValoracion}</span>
    `;

    contenedorNotasAlumno.appendChild(fila);
  }
}

// Mostrar historial de asistencia del aprendiz
function mostrarAsistencia() {
  const porcentaje =
    datosAsist.totales > 0 ? parseInt((datosAsist.asistidas / datosAsist.totales) * 100) : 0;

  const alDia = porcentaje >= 75;
  const claseAsist = alDia ? "estado-aprobado" : "estado-pendiente";

  alumnoPorcentajeAsistencia.textContent = `${porcentaje}%`;
  alumnoPorcentajeAsistencia.setAttribute("class", claseAsist);
  alumnoDetalleSesiones.textContent = `${datosAsist.asistidas} de ${datosAsist.totales} sesiones`;

  const textoHoy = datosAsist.presenteHoy ? "Presente" : "Ausente";
  const claseHoy = datosAsist.presenteHoy ? "estado-aprobado" : "estado-pendiente";
  const textoPorcentaje = alDia
    ? `${porcentaje}% (Al día)`
    : `${porcentaje}% (Riesgo por inasistencia)`;

  contenedorAsistenciaAlumno.innerHTML = "";

  const fila = document.createElement("div");
  fila.classList.add("fila", "fila-alumno-asistencia");
  fila.innerHTML = `
    <span>${datosAsist.fecha}</span>
    <span class="${claseHoy}">${textoHoy}</span>
    <span>${datosAsist.asistidas} clases</span>
    <span>${datosAsist.totales} sesiones</span>
    <span class="${claseAsist}">${textoPorcentaje}</span>
  `;

  contenedorAsistenciaAlumno.appendChild(fila);
}

btnSalirAlumno.addEventListener("click", function () {
  localStorage.removeItem("usuarioActivo");
});

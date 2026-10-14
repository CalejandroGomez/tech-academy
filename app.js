// NOTAS DEL EQUIPO: Arreglo de objetos con la información de los programas académicos
const programas = [
  {
    id: 1,
    titulo: "Arquitectura y Creación de Código",
    descripcion: "Aprende el arte de la programación frontend y backend, estructuración de bases de datos y desarrollo de software moderno con altos estándares de calidad.",
    duracion: "3 semestres",
    docente: "Diego Giraldo Zapata"
  },
  {
    id: 2,
    titulo: "Restauración de Computadores",
    descripcion: "Domina el diagnóstico de hardware, mantenimiento correctivo y preventivo, configuración de sistemas operativos y ensamble de equipos avanzados.",
    duracion: "2 semestres",
    docente: "Carlos Andrés Vélez"
  },
  {
    id: 3,
    titulo: "Diseño de Soluciones Cloud",
    descripcion: "Construye infraestructuras escalables en la nube, despliegue de aplicaciones, administración de servidores y seguridad informática.",
    duracion: "3 semestres",
    docente: "María Elena Restrepo"
  }
];

// NOTAS DEL EQUIPO: Selectores para elementos interactivos del inicio
const btnExplorar = document.getElementById("btn-explorar");
const contenedorProgramas = document.getElementById("programas");
const contenedorDetalle = document.getElementById("detalle-programa");
const tarjetas = document.querySelectorAll(".card");

// NOTAS DEL EQUIPO: Evento click para scroll suave hacia la sección de saberes
if (btnExplorar && contenedorProgramas) {
  btnExplorar.addEventListener("click", function (evento) {
    evento.preventDefault();
    contenedorProgramas.scrollIntoView({ behavior: "smooth" });
  });
}

// NOTAS DEL EQUIPO: Evento click en cada tarjeta para consultar y mostrar detalles en el DOM
tarjetas.forEach(function (tarjeta) {
  tarjeta.addEventListener("click", function () {
    const idSeleccionado = Number(tarjeta.getAttribute("data-id"));
    const programaEncontrado = programas.find(function (programa) {
      return programa.id === idSeleccionado;
    });

    if (programaEncontrado) {
      mostrarDetalle(programaEncontrado);
    }
  });
});

// NOTAS DEL EQUIPO: Renderizado dinámico del panel de detalles del curso
function mostrarDetalle(programa) {
  contenedorDetalle.innerHTML = `
    <div class="panel-detalle">
      <button class="cerrar-detalle" id="btn-cerrar">&times;</button>
      <h3>${programa.titulo}</h3>
      <p>${programa.descripcion}</p>
      <div class="info-extra">
        <strong>Duración:</strong> ${programa.duracion} | 
        <strong>Docente guía:</strong> ${programa.docente}
      </div>
    </div>
  `;

  contenedorDetalle.scrollIntoView({ behavior: "smooth" });

  const btnCerrar = document.getElementById("btn-cerrar");
  if (btnCerrar) {
    btnCerrar.addEventListener("click", function () {
      contenedorDetalle.innerHTML = "";
    });
  }
}

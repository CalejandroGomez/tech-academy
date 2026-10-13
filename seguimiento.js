// UTILIZAR LOS SELECTORES (Conectamos el JS con el HTML)

const elementop = document.getElementById('contenedor-estudiantes')
const form = document.querySelector('form')


// Selectores para capturar las casillas donde el usuario escribe
const Nombre = document.getElementById('nuevo-nombre')
const Estado = document.getElementById('nuevo-estado')
const Nota = document.getElementById('nueva-nota')
const Asistencia = document.getElementById('nueva-asistencia')


// CREACIÓN DE ELEMENTOS EN EL DOM (Estudiante inicial para que la tabla no abra vacía)
const Estudiante_1 = document.createElement('div')
Estudiante_1.setAttribute('class','fila')
// agregar atributos del estudiante
Estudiante_1.innerHTML = '<span>Mariana Gómez</span><span>Entregado</span><span>4.5</span><span>95%</span>'


// creacion de botón Borrar: para eliminar un estudiante
const btnBorrar=document.createElement('button')
btnBorrar.setAttribute('class', 'btn-Borrar')
btnBorrar.innerHTML='Borrar'

btnBorrar.addEventListener('click', function(){
    alert('se va a eliminar el registro de Mariana Gómez')
    Estudiante_1.remove()
})

const cbtnborrar= document.createElement('span') // es necesario crearle un epacio al botón
cbtnborrar.appendChild(btnBorrar)

Estudiante_1.appendChild(cbtnborrar)    
elementop.appendChild(Estudiante_1) 



// ---- EVENTO: AGREGAR ESTUDIANTE DESDE EL FORMULARIO (De tus apuntes) ----


// El submit envia todo en un paquete. Funciona con enter y enviar (De tus apuntes)
form.addEventListener('submit', function (event) {
    event.preventDefault()

   // Fabricamos la nueva fila para el alumno
    const fila2= document.createElement('div');
    fila2.setAttribute('class', 'fila');
    
    // Creamos las 4 columnas para los datos
    const cNombre = document.createElement('span') // nombre del estudiante
    cNombre.innerHTML = Nombre.value

    const cEstado = document.createElement('span')
    cEstado.innerHTML = Estado.value

    const cNota = document.createElement('span') // notas
    cNota.innerHTML = Nota.value

    const cAsistencia = document.createElement('span')
    cAsistencia.innerHTML = Asistencia.value

    //nuevo botón de borrar para el alumno
    const btnNuevoBorrar = document.createElement('button')
    btnNuevoBorrar.setAttribute('class', 'btn-borrar2')
    btnNuevoBorrar.innerHTML = 'Borrar'

    btnNuevoBorrar.addEventListener('click', function() {
        fila2.remove();
    });

    // columna del nuevo boton borrrar
    const cbtNuevo = document.createElement('span');
    cbtNuevo.appendChild(btnNuevoBorrar);

    // datos nuevos en la fila 2
    fila2.appendChild(cNombre);
    fila2.appendChild(cEstado);
    fila2.appendChild(cNota);
    fila2.appendChild(cAsistencia);
    fila2.appendChild(cbtNuevo);

    elementop.appendChild(fila2);
    
    form.reset();
});
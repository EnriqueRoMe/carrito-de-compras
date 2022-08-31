//Variables
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const carrito = document.querySelector('#carrito');

let articulosCarrito = [];


cargarEventListeners();

function cargarEventListeners(){
    //Agregar un curso presionando "Agregando al carrito"
    listaCursos.addEventListener('click' , agregarCarrito);

    //Elimina cursos del carrito
    carrito.addEventListener('click',  eliminarCurso);

    //Vaciar el carriot
    vaciarCarrito.addEventListener('click', ()=> {
        articulosCarrito = [];
        limpiarHTML();
    })
}

//Funciones
function agregarCarrito(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Vaciar el carriot


//Eliminar un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')){
        const cursoID = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoID);
        carritoHTML(); //Iterar sobre el carrito 
    }
}

//Lee el contenido del HTML  y extrae la información
function leerDatosCurso(curso) {
// console.log(curso);

// Crear el objeto con el contenido del curso actual
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elementos ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if( curso.id === infoCurso.id){
                curso.cantidad++; //Retorna el objeto actualizado
                return curso;
            }else {
                return curso;  //Retorna los objetos  que no estan duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else {
           //Agrega los articulos al arreglo de carrito
   articulosCarrito = [...articulosCarrito , infoCurso];
  

    }

 carritoHTML();

}

// Muestra el carrito de compras en el HTML
function carritoHTML() {

    //Limpiar el HTML
limpiarHTML();

    //Recorre el carrito y genera el HTML

    articulosCarrito.forEach( curso => {
        const{imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img width="100" src = "${imagen}" >
        </td>
        <td>
            ${titulo}
        </td>
        <td>
        ${precio}
    </td>
    <td>
    ${cantidad}
</td>
<td>
    <a href="#" class="borrar-curso" data-id="${id}"> X </a>
</td>
        `;
        contenedorCarrito.appendChild(row);
    })
}

//Elimina los cursos del tbody

function limpiarHTML(){
    //Forma lenta
    // contenedorCarrito.innerHTML = '';
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

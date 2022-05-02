//Dom vars
const carito = document.getElementById("carrito");
const listCursos = document.getElementById("lista-cursos");

const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const btn_vaciarcarito = document.querySelector("#vaciar_carito");

let articuloCarito = [];

//function
//mostrar el carito de compras
const caritoHTML = () => {
  //limpiar el carito
  contenedorCarrito.innerHTML = ``;
  // console.log(contenedorCarrito);
  articuloCarito.forEach((cur) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src="img/${cur.imagen.split("/").slice(-1)}" />
        </td>
        <td>
            ${cur.titulo}
        </td>
        <td>
            ${cur.precio}
        
        </td>
            
        <td>
            ${cur.cantidad}
          </td>

        `;
    contenedorCarrito.appendChild(row);
  });
};
//lee el contenido del html al que le dimos click
const leerDatosCurso = (curso) => {
  //creando un objeto con el contenido del curso
  let infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".oferta").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  articuloCarito = [...articuloCarito, infoCurso];
  //console.log(articuloCarito);
  caritoHTML();
};
const cargarEventlistener = () => {
  listCursos.addEventListener("click", agregarCurso);
  carito.querySelector('.carrito--comprascontent__boton').addEventListener("click",limpiarCArito)
};

const agregarCurso = (e) => {
  e.preventDefault();
  if (e.target.classList.contains("boton")) {
    let cursoSeleccionado = e.target.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
};
const limpiarCArito = ()=>{
  articuloCarito= [];
  contenedorCarrito.innerHTML = ``;
}

cargarEventlistener();

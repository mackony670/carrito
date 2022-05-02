"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//Dom vars
var carito = document.getElementById("carrito");
var listCursos = document.getElementById("lista-cursos");
var contenedorCarrito = document.querySelector("#lista-carrito tbody");
var btn_vaciarcarito = document.querySelector("#vaciar_carito");
var articuloCarito = []; //function
//mostrar el carito de compras

var caritoHTML = function caritoHTML() {
  //limpiar el carito
  contenedorCarrito.innerHTML = ""; // console.log(contenedorCarrito);

  articuloCarito.forEach(function (cur) {
    var row = document.createElement("tr");
    row.innerHTML = "\n        <td>\n            <img src=\"img/".concat(cur.imagen.split("/").slice(-1), "\" />\n        </td>\n        <td>\n            ").concat(cur.titulo, "\n        </td>\n        <td>\n            ").concat(cur.precio, "\n        \n        </td>\n            \n        <td>\n            ").concat(cur.cantidad, "\n          </td>\n\n        ");
    contenedorCarrito.appendChild(row);
  });
}; //lee el contenido del html al que le dimos click


var leerDatosCurso = function leerDatosCurso(curso) {
  //creando un objeto con el contenido del curso
  var infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".oferta").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1
  };
  articuloCarito = [].concat(_toConsumableArray(articuloCarito), [infoCurso]); //console.log(articuloCarito);

  caritoHTML();
};

var cargarEventlistener = function cargarEventlistener() {
  listCursos.addEventListener("click", agregarCurso);
  carito.querySelector('.carrito--comprascontent__boton').addEventListener("click", limpiarCArito);
};

var agregarCurso = function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("boton")) {
    var cursoSeleccionado = e.target.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
};

var limpiarCArito = function limpiarCArito() {
  articuloCarito = [];
  contenedorCarrito.innerHTML = "";
};

cargarEventlistener();
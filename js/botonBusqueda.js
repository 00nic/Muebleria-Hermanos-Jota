import { catalogo } from './catalogo.js';
import { cargarCatalogo } from './catalogoProductos.js';

const inputBuscar = document.querySelector(".buscador");
const boton = document.getElementById("boton-buscar");

async function buscarProductos() {
    const palabra = inputBuscar.value.trim().toLowerCase();
    if (palabra === "") {
        cargarCatalogo(catalogo);
        return;
    }

    const resultadosBusqueda = catalogo.filter(producto =>
        producto.nombre.toLowerCase().includes(palabra)
    );
    cargarCatalogo(resultadosBusqueda);
}

let timeoutBusqueda;
inputBuscar.addEventListener('input', function () {
    clearTimeout(timeoutBusqueda);
    timeoutBusqueda = setTimeout(buscarProductos, 300);
});

boton.addEventListener('click', buscarProductos);

inputBuscar.addEventListener('keyup', (key) => {
    if (key.key === 'Enter') buscarProductos();
});

document.addEventListener('DOMContentLoaded', () => {
    cargarCatalogo(catalogo);
});
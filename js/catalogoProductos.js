import {catalogo} from './catalogo.js';

export async function cargarCatalogo() {

    const productosGrid = document.querySelector('.productos-grid');

    if(!productosGrid){
        console.error("No se encontro .productos-grid");
        return
    }

    productosGrid.innerHTML = "";

    catalogo.forEach((producto) => {
        const articuloProducto = document.createElement('article');
        articuloProducto.classList.add('producto');

        const link = document.createElement('a');

        const imgProducto= document.createElement('img');
        imgProducto.classList.add('producto-imagen');
        imgProducto.setAttribute('src', producto.imagenUrl);
        imgProducto.setAttribute('alt', producto.nombre);
        link.appendChild(imgProducto);

        const nombreProducto = document.createElement('h2');
        nombreProducto.textContent = producto.nombre;
        nombreProducto.classList.add('producto-titulo');
        link.appendChild(nombreProducto);

        const descrProducto = document.createElement('p');
        descrProducto.textContent = producto.detalle.precio;
        descrProducto.classList.add('producto-descripcion')
        link.appendChild(descrProducto);

        articuloProducto.appendChild(link);
        productosGrid.appendChild(articuloProducto);

        articuloProducto.addEventListener('click', () => {
        window.location.href = `producto.html?id=${producto.id}`;
        }
    )
})};

export function filtrarCatalogo(texto) {
    const resultado = catalogo.filter(producto => 
        producto.nombre.toLowerCase().includes(texto.toLowerCase()) ||
        producto.descripción.toLowerCase().includes(texto.toLowerCase())
    );
    cargarCatalogo
}


document.addEventListener('DOMContentLoaded', cargarCatalogo);
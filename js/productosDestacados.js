import {catalogo} from './catalogo.js';
 
const destacados = catalogo.filter(p => p.destacado);

const productosGrid = document.querySelector('.productos-grid');

destacados.forEach(producto => {
    const articuloProducto = document.createElement('article');
    articuloProducto.classList.add('producto');

    const imgProducto= document.createElement('img');
    imgProducto.classList.add('producto-imagen');
    imgProducto.setAttribute('src', producto.imagenUrl);
    imgProducto.setAttribute('alt', producto.nombre);
    articuloProducto.appendChild(imgProducto);

    const nombreProducto = document.createElement('h2');
    nombreProducto.textContent = producto.nombre;
    nombreProducto.classList.add('producto-titulo');
    articuloProducto.appendChild(nombreProducto);

    const descrProducto = document.createElement('p');
    descrProducto.textContent = producto.info;
    descrProducto.classList.add('producto-descripcion')
    articuloProducto.appendChild(descrProducto);

    productosGrid.appendChild(articuloProducto);    
});
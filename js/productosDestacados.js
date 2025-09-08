import {catalogo} from './catalogo.js';
let count = localStorage.getItem("carritoContador") || 0;
document.getElementById("carrito-contador").innerText = count;
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

    const productoBoton = document.createElement('button');
    productoBoton.classList.add('producto-boton');
    productoBoton.textContent= 'Ver Detalle';
    articuloProducto.appendChild(productoBoton)


    productosGrid.appendChild(articuloProducto); 
    
    productoBoton.addEventListener('click', () => {
        window.location.href = `producto.html?id=${producto.id}`
    })
});
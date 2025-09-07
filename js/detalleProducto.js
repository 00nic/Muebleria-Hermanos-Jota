import {catalogo} from './catalogo.js';

const params = new URLSearchParams(window.location.search);
const idProducto = params.get('id');

const producto = catalogo.find(p => p.id === idProducto);

const seccionProducto = document.querySelector('.producto');

const seccionDetalles = document.querySelector('.detalles')

const productoImagen = document.createElement('img');
productoImagen.classList.add('producto-imagen');
productoImagen.setAttribute('src', producto.imagenUrl);
productoImagen.setAttribute('alt', producto.nombre);
seccionProducto.appendChild(productoImagen);

const nombreProducto = document.createElement('h1');
nombreProducto.textContent = producto.nombre;
nombreProducto.classList.add('producto-titulo');
seccionProducto.appendChild(nombreProducto);

const descrProducto = document.createElement('p');    
descrProducto.textContent = producto.descripción;
descrProducto.classList.add('producto-descripcion')
seccionProducto.appendChild(descrProducto);

const productoBoton = document.createElement('button');
productoBoton.classList.add('producto-boton');
productoBoton.textContent= 'Agregar al carrito';
seccionProducto.appendChild(productoBoton)

productoBoton.addEventListener("click", () => {
        agregarAlCarrito(producto.id);
    });


Object.entries(producto.detalle).forEach(([clave, valor]) => {
    if (!valor) return; // salta las propiedades vacías

    const detalleDiv = document.createElement('div');
    detalleDiv.classList.add('detalle')

    const detalleTitulo = document.createElement('h2');
    detalleTitulo.classList.add('detalle-titulo')
    detalleTitulo.textContent = clave.charAt(0).toUpperCase() + clave.slice(1);
    detalleDiv.appendChild(detalleTitulo)

    const detalleDescripcion = document.createElement('p');
    detalleDescripcion.classList.add('detalle-descripcion');
    detalleDescripcion.textContent = valor
    detalleDiv.appendChild(detalleDescripcion);

    seccionDetalles.appendChild(detalleDiv)

});

let carrito = [];
const contadorCarrito = document.getElementById('carrito-contador');
const subtotalCarrito = document.getElementById('subtotal-carrito');


function agregarAlCarrito(id) {
    const producto = catalogo.find(p => p.id === id);
    const existente = carrito.find(item => item.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
}

function actualizarCarrito() {
    // Contador de productos
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    if (contadorCarrito) contadorCarrito.textContent = totalCantidad;

    // Subtotal
    const totalPrecio = carrito.reduce((acc, item) => {
        let precioNumerico = item.detalle.precio ? parseFloat(
            item.detalle.precio.replace('$', '').replace(/\./g, '')
        ) : 0;
        return acc + (precioNumerico * item.cantidad);
    }, 0);
    if (subtotalCarrito) subtotalCarrito.textContent = `$${totalPrecio.toLocaleString()}`;
}

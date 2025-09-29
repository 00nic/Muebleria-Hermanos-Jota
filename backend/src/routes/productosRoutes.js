const express = require("express");
const router = express.Router();
const catalogo = require("../data/catalogo");

//get devuelve todos los productos --------FUNCIONANDO
router.get("/", (req, res) => {
    res.status(200).json(catalogo); 
})


//get devuelve por id --------FUNCIONANDO
router.get("/:id", (req, res, next) => { 
    const producto = catalogo.find(p => parseInt(p.id) === parseInt(req.params.id)); 

        if (!producto) { 
            const error = new Error('Producto no encontrado');
            error.status = 404;
            return next(error);
        } 
        res.status(200).json(producto);
})

//post agregar
router.post("/", (req, res, next) => {
    //try {
        //const { nombre, info, descripcion, imagenUrl, detalle, destacado } = req.body;

        const nuevoProducto1 = req.body;

        if (!nuevoProducto1.nombre || !nuevoProducto1.descripcion) {
            const error = new Error('No hay suficientes datos para crear el producto')
            error.status= 400;
            return next(error)
        }

        const existe = catalogo.some(p => p.nombre === nuevoProducto1.nombre);
        
        if (existe) {
            const error = new Error('El elemento ya existe');
            error.status= 409;
            return next(error);
        }

        const nuevoProducto = {
            id: (catalogo.length + 1).toString(),
            nombre,
            info,
            descripcion,
            imagenUrl,
            detalle: detalle || {},
            destacado: destacado || false
        }

        catalogo.push(nuevoProducto); 
        res.status(201).json(nuevoProducto);
    } 
    //catch (err) { next(err) }
})


module.exports = router;
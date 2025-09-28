const express = require("express");
const router = express.Router();
const catalogo = require("../data/catalogo");


//get devuelve todos los productos 
router.get("/", (req, res) => { 
    res.status(200).json(catalogo); })


//get devuelve por id 
router.get("/:id", (req, res, next) => { 
    try { const producto = catalogo.find(p => p.id == parseInt(req.params.id)); 
        if (!producto) { 
            return res.status(404).json({ mensaje: "Producto no encontrado" }) } 
            res.status(200).json(producto); } catch (err) { next(err); } })





    //post 


router.post("/", (req, res, next) => {
    try {
        const { nombre, info, descripcion, imagenUrl, detalle, destacado } = req.body;
        if (!nombre || !info) {
            return res.status(400).json({ mensaje: "No hay datos minimos para crear el producto" })
        }

        const existe = catalogo.some(p => p.nombre === nombre);
        //verifica que el producto que se quiere crear no exista 
        if (existe) {
            return res.status(409).json({ mensaje: "El elemento ya existe" })
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
        catalogo.push(nuevoProducto); res.status(201).json(nuevoProducto);
    } catch (err) { next(err) }
})


module.exports = router;
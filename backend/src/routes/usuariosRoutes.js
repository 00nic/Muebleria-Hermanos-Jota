const express = require('express');
const router = express.Router();

const usuarios = [
    { id: 1, nombre: 'Alvaro Ibarra', email: ' alvaroibarra@gmail.com ' },
    { id: 2, nombre: 'Elliot Alderson', email: 'elliotalderson@gmail.com' },
    { id: 3, nombre: 'Nahuel Garcia', email: ' nahucordero@gmail.com' },
    { id: 4, nombre: 'Nicolas Ramirez', email: 'nicoramirez@gmail.com' },
    { id: 5, nombre: 'Gael Techera', email: 'gaeltech@gmail.com' },
]

router.get('/', (req, res) => {
    res.json(usuarios);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        const error = new Error('Producto no encontrado');
        error.status = 404;
        return next(error);
    }
    res.status(200).json(usuario);
});

module.exports = router;

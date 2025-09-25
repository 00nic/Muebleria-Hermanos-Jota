const express = require('express');
const router = express.Router();

const usuarios = [
    { id: 1, nombre: 'Alvaro Ibarra', email: ' alvaroibarra@gmail.com '},
    { id: 2, nombre: 'Elliot Alderson', email: 'elliotalderson@gmail.com'},
    { id: 3, nombre: 'Nahuel Garcia', email: ' nahugarcia@gmail.com'},
    { id: 4, nombre: 'Nicolas Ramirez', email: 'nicoramirez@gmail.com'},
    { id: 5, nombre: 'Gael Techera', email: 'gaeltech@gmail.com'},
]

router.get('/', (req, res) => {
    res.json(usuarios);
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
});

module.exports = router;

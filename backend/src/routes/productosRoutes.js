const express = require('express');
const router = express.Router();
router.use(express.json())

const catalogo = [
    {
        id: '1',
        nombre: 'Aparador Uspallata',
        info: 'Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón.',
        descripción: 'Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.',
        imagenUrl: 'img/productos/Aparador Uspallata.png',
        detalle: { 
                medidas: '180 × 45 × 75 cm',
                materiales: 'Nogal macizo FSC®, herrajes de latón',
                acabado: 'Aceite natural ecológico',
                peso: '68 kg',
                capacidad: '6 compartimentos interiores',
                precio: '$450.000'
            },
        destacado: true, 
    },
    {
        id: '2',
        nombre: 'Biblioteca Recoleta',
        descripción: 'Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.',
        imagenUrl: 'img/productos/Biblioteca Recoleta.png',
        detalle: { 
                medidas: '100 × 35 × 200 cm',
                materiales: 'Estructura de acero, estantes de roble',
                acabado: 'Laca mate ecológica',
                peso: '45 kg por estante',
                capacidad: '5 estantes ajustables',
                precio: '$380.000'
            } 
    },
    {
        id: '3',
        nombre: 'Butaca Mendoza',
        descripción: 'Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.',
        imagenUrl: 'img/productos/Butaca Mendoza.png',
        detalle: { 
                medidas: '80 × 75 × 85 cm',
                materiales: 'Guatambú macizo, tela bouclé',
                acabado: 'Cera vegetal, tapizado premium',
                tapizado: 'Repelente al agua y manchas',
                confort: 'Espuma alta densidad',
                precio: '$150.000'
            } 
    }
]

router.get('/', (req, res) => {
    res.json(catalogo)
    
})

router.get('/:id', (req, res, next) => {
    const idProducto = parseInt(req.params.id);
    const productoEspecifico = catalogo.find(p => idProducto == parseInt(p.id) );
    if (!productoEspecifico){
        const error = new Error(`Producto no encontrado`);
        error.status = 404;
        return next(error);
    }
    res.status(200).json({
        mensaje:`Obteniendo información del producto con ID: ${idProducto}`,
        producto: productoEspecifico
    })
})

router.post('/', (req, res) => {
    const datosProducto = req.body;
    console.log(datosProducto);
    res.status(201).json({
        status: `exito Producto creado`,
        producto_recibido: datosProducto
    })
});

module.exports= router
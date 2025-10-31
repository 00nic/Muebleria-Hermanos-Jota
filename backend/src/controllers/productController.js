const Product = require('../models/Product.js');

//obtener todos los productos (FUNCINANDO)
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
}

//obtener producto por id (FUNCIONANDO)
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ mensaje: `Producto con id ${req.params.id} no encontrado` });
        }
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor" })
    }
}

//Crear producto (agregar validacion de producto existente) (PROBAR)
const createProduct = async (req, res) => {
    const product = new Product(req.body);
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.log(error);
    }
}

//actualizar producto(PROBAR)
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ mensaje: "El producto que desea actualizar no se encontro." });
        }
    } catch (error) {
        res.status(500).json({ mensaje: "Error con el servidor" });
    }
}


//eliminar producto (PROBAR)
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (product) {
            res.status(200).json({ mensaje: "Producto eliminado" });
        } else {
            res.status(404).json({ mensaje: "Producto no encontrado" })
        }

    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor" })
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
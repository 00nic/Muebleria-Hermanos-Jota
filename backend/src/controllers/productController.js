const Product = require("../models/Product.js");

//obtener todos los productos (FUNCINANDO)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

//obtener producto por id (FUNCIONANDO)
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.status(200).json(product);
    } else {
      const error = new Error("Usuario no encontrado");
      error.status = 404;
      return next(error);
    }
  } catch (error) {
    error.status = 400;
    return next(error);
  }
};

//Crear producto (agregar validacion de producto existente) (PROBAR)
const createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

//actualizar producto(PROBAR)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (product) {
      res.status(200).json(product);
    } else {
      const error = new Error(
        "El producto que desea actualizar no se encontro."
      );
      error.status = 404;
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};

//eliminar producto (PROBAR)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (product) {
      res.status(200).json({ mensaje: "Producto eliminado" });
    } else {
      const error = new Error("El producto que desea eliminar no se encontro.");
      error.status = 404;
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

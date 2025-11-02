const Product = require("../models/Product.js");

//obtener todos los productos (FUNCINANDO)
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};

//obtener producto por id (FUNCIONANDO)
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      return next(error);
    }

    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

//Crear producto (agregar validacion de producto existente) (PROBAR)
const createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const newProduct = await product.save();
    return res.status(201).json(newProduct);
  } catch (error) {
    return next(error);
  }
};

//actualizar producto(PROBAR)
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      return next(error);
    }

    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

//eliminar producto (PROBAR)
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      return next(error);
    }

    return res.status(200).json({ message: "Producto eliminado" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

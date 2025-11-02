const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
  },
  precio: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  imagenUrl: {
    type: String,
    required: false,
  },
  detalle: {
    type: Object,
  },
  destacado: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product", productSchema, "Products");
module.exports = Product;

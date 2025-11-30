const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminGuard = require("../middlewares/adminGuard");

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController.js');

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.post('/', authMiddleware, adminGuard, createProduct);

router.put('/:id', authMiddleware, adminGuard, updateProduct);

router.delete('/:id', authMiddleware, adminGuard, deleteProduct);

module.exports = router;
const express = require('express');
const router = express.Router();
const { authenticationMiddleware } = require("../middlewares/authMiddleware.js");
const { adminGuard } = require("../middlewares/adminGuard.js");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController.js');

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.post('/', authenticationMiddleware, adminGuard, createProduct);

router.put('/:id', authenticationMiddleware, adminGuard, updateProduct);

router.delete('/:id', authenticationMiddleware, adminGuard, deleteProduct);

module.exports = router;
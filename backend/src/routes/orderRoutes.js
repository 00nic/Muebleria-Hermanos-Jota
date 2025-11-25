const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

// Todas las rutas de órdenes requieren autenticación
router.use(authMiddleware);

// POST /api/orders - Crear nueva orden
router.post("/", orderController.createOrder);

// GET /api/orders - Obtener todas las órdenes del usuario
router.get("/", orderController.getUserOrders);

// GET /api/orders/:id - Obtener una orden específica
router.get("/:id", orderController.getOrderById);

module.exports = router;

const express = require("express");
const router = express.Router();
const { authenticationMiddleware } = require("../middlewares/authMiddleware.js");

const {
    createOrder,
    getUserOrders,
    getOrderById
} = require("../controllers/orderController.js"); 

// Todas las rutas de órdenes requieren autenticación
router.use(authenticationMiddleware);

// POST /api/orders - Crear nueva orden
router.post("/", createOrder);

// GET /api/orders - Obtener todas las órdenes del usuario
router.get("/", getUserOrders);

// GET /api/orders/:id - Obtener una orden específica
router.get("/:id", getOrderById);

module.exports = router;

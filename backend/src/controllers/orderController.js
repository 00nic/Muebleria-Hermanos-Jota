const Order = require("../models/Order");

// Crear una nueva orden
const createOrder = async (req, res, next) => {
    try {
        const { items, total } = req.body;
        const userId = req.user._id; // El usuario viene del middleware de autenticación

        // Validación básica
        if (!items || !Array.isArray(items) || items.length === 0) {
            const error = new Error(
                "El pedido debe contener al menos un producto"
            );
            error.status = 400;
            throw error;
        }

        if (!total || total <= 0) {
            const error = new Error("El total del pedido debe ser mayor a 0");
            error.status = 400;
            throw error;
        }

        // Crear la orden
        const newOrder = new Order({
            userId,
            items,
            total,
            status: "pending",
        });

        await newOrder.save();

        res.status(201).json({
            message: "Pedido creado exitosamente",
            order: newOrder,
        });
    } catch (error) {
        next(error);
    }
};

// Obtener todas las órdenes del usuario autenticado
const getUserOrders = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Órdenes obtenidas exitosamente",
            orders,
        });
    } catch (error) {
        next(error);
    }
};

// Obtener una orden específica
const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const order = await Order.findOne({ _id: id, userId });

        if (!order) {
            const error = new Error("Orden no encontrada");
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            message: "Orden obtenida exitosamente",
            order,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createOrder,
    getUserOrders,
    getOrderById,
};

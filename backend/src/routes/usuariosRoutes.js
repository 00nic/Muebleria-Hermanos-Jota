const express = require("express");
const router = express.Router();
const { authenticationMiddleware } = require("../middlewares/authMiddleware");
const { adminGuard } = require("../middlewares/adminGuard");
const User = require("../models/User");

// NOTE: Previously this route returned a hard-coded list. It now reads from the DB.

// GET /api/usuarios - returns all users (admin only). Excludes the password field.
router.get(
    "/",
    authenticationMiddleware,
    adminGuard,
    async (req, res, next) => {
        try {
            const users = await User.find().select("-password");
            res.json(users);
        } catch (err) {
            next(err);
        }
    }
);

// GET /api/usuarios/:id - returns a single user by id (authenticated)
router.get("/:id", authenticationMiddleware, async (req, res, next) => {
    try {
        // Si el requester no es admin, solo puede pedir su propio recurso
        const requesterRole = req.user.role || req.user.rol;
        const requesterId = String(req.user._id || req.user.id);

        if (
            String(requesterRole) !== "admin" &&
            requesterId !== req.params.id
        ) {
            return res.status(403).json({ error: "Acceso denegado" });
        }

        const user = await User.findById(req.params.id).select("-password");
        if (!user)
            return res.status(404).json({ error: "Usuario no encontrado" });
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});

module.exports = router;

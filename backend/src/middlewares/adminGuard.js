const adminGuard = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: "Usuario no autenticado" });
    }

    // Support both 'role' and legacy 'rol' keys in the token payload
    const role = req.user.role || req.user.rol;
    if (role && String(role).includes("admin")) {
        next();
    } else {
        return res.status(403).json({ error: "Acceso denegado" });
    }
};

module.exports = { adminGuard };

const adminGuard = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({error: "Usuario no autenticado"});
    }

    if (req.user.rol && req.user.rol.includes( "admin" )) {
        next();
    } else {
        return res.status(403).json({error: "Acceso denegado "});
    }
};

module.exports = { adminGuard };
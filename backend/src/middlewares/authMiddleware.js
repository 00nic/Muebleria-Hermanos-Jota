// Middleware simple para verificar autenticación
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            const error = new Error("No autorizado - Token no proporcionado");
            error.status = 401;
            throw error;
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            const error = new Error("No autorizado - Token inválido");
            error.status = 401;
            throw error;
        }

        // Decodificar el token (sin verificación por ahora, ya que no usamos jsonwebtoken)
        try {
            const payload = JSON.parse(
                Buffer.from(token.split(".")[1], "base64").toString()
            );
            req.user = {
                _id: payload._id,
                email: payload.email,
                username: payload.username,
                role: payload.role,
            };
            next();
        } catch (decodeError) {
            const error = new Error("Token inválido");
            error.status = 401;
            throw error;
        }
    } catch (error) {
        next(error);
    }
};

module.exports = authMiddleware;

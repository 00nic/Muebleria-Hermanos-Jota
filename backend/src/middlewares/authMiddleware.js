const jwt = require('jsonwebtoken');

const authenticationMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader ||  !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ error: "Access Token is required"});
    }

    const token = authHeader.substring(7); // Remover el prefijo "Bearer "

    try {
        const decodedPayload =jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedPayload;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token has expired"});
        }
        if (error.name == "JsonWebTokenError") {
            return res.status(401).json({ error: "Invalid token"});
        }
    }
};

module.exports = { authenticationMiddleware };

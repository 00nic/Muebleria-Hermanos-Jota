const User = require("../models/User");

// Login simple (sin bcrypt por ahora)
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validación básica
        if (!email || !password) {
            const error = new Error("Email y password son requeridos");
            error.status = 400;
            throw error;
        }

        // Buscar usuario por email
        const user = await User.findOne({ email });

        if (!user) {
            const error = new Error("Credenciales inválidas");
            error.status = 401;
            throw error;
        }

        // Verificar password (comparación simple por ahora)
        if (user.password !== password) {
            const error = new Error("Credenciales inválidas");
            error.status = 401;
            throw error;
        }

        // Crear token JWT manualmente (simple, sin librería)
        const payload = {
            _id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
        };

        // Generar un token simple (en producción usa jsonwebtoken)
        const header = Buffer.from(
            JSON.stringify({ alg: "none", typ: "JWT" })
        ).toString("base64");
        const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString(
            "base64"
        );
        const token = `${header}.${payloadEncoded}.`;

        res.status(200).json({
            message: "Login exitoso",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Registro simple
const register = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;

        // Validación básica
        if (!username || !email || !password) {
            const error = new Error(
                "Username, email y password son requeridos"
            );
            error.status = 400;
            throw error;
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });
        if (existingUser) {
            const error = new Error("El usuario ya existe");
            error.status = 409;
            throw error;
        }

        // Crear nuevo usuario (sin hash por ahora)
        const newUser = new User({
            username,
            email,
            password, // En producción, usa bcrypt para hashear
            role: role || "user",
        });

        await newUser.save();

        res.status(201).json({
            message: "Usuario creado exitosamente",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login,
    register,
};

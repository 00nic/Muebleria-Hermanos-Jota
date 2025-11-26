const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            const error = new Error("El email o nombre de usuario se encuentra en uso");
            error.status = 400;
            return next(error);
        }

        const salt = await bcrypt.salt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUSer = await newUser.save();

        res.status(201).json({
            message: ('Usuario creado correctamente')
        });

    } catch (error) {
        return next(error);
    }
}


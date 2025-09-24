const manejadorErrores = (err, req, res, next) => {
    const status = err.status || 500;
    console.error(err.message, err.stack);
    res.status(status).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? 'Nada' : err.stack
    });
};

module.exports= manejadorErrores;
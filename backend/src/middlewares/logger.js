const logger = (req, res, next) => {
    console.log(`${new Date()} petición: ${req.method} en la ruta: ${req.originalUrl}`);
    next()
};

module.exports= logger;
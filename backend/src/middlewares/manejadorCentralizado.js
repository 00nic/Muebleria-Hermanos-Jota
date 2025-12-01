const manejadorErrores = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";
  console.error(err);
  // Mongoose ValidationError
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors || {}).map((e) => e.message);
    return res.status(400).json({
      success: false,
      error: "ValidationError",
      message: messages.length ? messages : err.message,
    });
  }

  // Mongoose CastError: id malformado u otros casteos
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      error: "CastError",
      message: "ID inv\u00e1lido o formato incorrecto",
    });
  }

  // MongoDB Duplicate Key (E11000)
  if (
    err.code === 11000 ||
    (err.name === "MongoServerError" && err.message?.includes("E11000"))
  ) {
    const fields = err.keyValue ? Object.keys(err.keyValue) : [];
    return res.status(409).json({
      success: false,
      error: "DuplicateKey",
      message:
        fields.length > 0
          ? `Valor duplicado en campo(s): ${fields.join(", ")}`
          : "Duplicate key error",
    });
  }

  // Errores personalizados con err.status (ej: 404 en rutas)
  const status = err.status || 500;
  return res.status(status).json({
    success: false,
    error: err.name || "InternalServerError",
    message: err.message || "Error interno del servidor",
    stack: isProd ? undefined : err.stack,
  });
};

module.exports = manejadorErrores;

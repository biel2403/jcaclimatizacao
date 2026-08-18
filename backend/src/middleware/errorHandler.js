function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;

  if (statusCode >= 500) {
    console.error(error);
  }

  res.status(statusCode).json({
    error: {
      code: error.code || "INTERNAL_ERROR",
      message:
        statusCode >= 500
          ? "Erro interno do servidor."
          : error.message
    }
  });
}

module.exports = { errorHandler };

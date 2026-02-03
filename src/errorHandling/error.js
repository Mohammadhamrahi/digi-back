function notFound(app) {
  app.use((req, res, next) => {
    return res.status(404).json({
      message: "page nout nound",
    });
  });
}

function errorHandller(app) {
  app.use((err, req, res, next) => {
    const status = err?.status ?? err.statusCode ?? 500;
    let message = err?.message ?? "internall server error";

    if (err?.name === "ValidationError") {
      const { details } = err;
      message = details?.body[0]?.message ?? "internall server error";
    }
    return res.status(status).json({
      message: message,
    });
  });
}

module.exports = {
  notFound,
  errorHandller,
};

const { Logs } = require("../../../db/models");

const logger = async (req, res, next) => {
  const startTime = Date.now();

  res.on("finish", function () {
    Logs.create({
      date: Date.now(),
      ipAddress: req.ip,
      host: req.hostname,
      path: decodeURI(req.url),
      method: req.method,
      body: JSON.stringify(req.body).includes("password")
        ? "this body is encrypted because it contains credential data"
        : JSON.stringify(req.body),
      files: JSON.stringify(req.files),
      responseTime: `${Date.now() - startTime} ms`,
      statusCode: res.statusCode,
      message: res.statusMessage,
    });
  });

  next();
};

module.exports = logger;

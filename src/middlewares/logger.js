const { Logs } = require("../../db/models");

const logger = async (req, res, next) => {
  startTime = Date.now();

  // console.error("Response Data:", res.statusCode);
  res.on("finish", function () {
    Logs.create({
      date: Date.now(),
      ipAddress: req.ip,
      host: req.hostname,
      path: decodeURI(req.url),
      method: req.method,
      body: JSON.stringify(req.body),
      files: JSON.stringify(req.files),
      responseTime: `${Date.now() - startTime} ms`,
      statusCode: res.statusCode,
      message: res.statusMessage,
    });
  });

  next();
};

module.exports = logger;

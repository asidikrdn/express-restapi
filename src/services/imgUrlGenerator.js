module.exports = (req, imageFileName) => {
  if (req.hostname === "localhost" || req.host === "127.0.0.1") {
    return `${req.protocol}://${req.get("host")}/static/${imageFileName}`;
  } else {
    return `https://${req.hostname}/static/${imageFileName}`;
  }
};
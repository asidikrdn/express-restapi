const express = require("express");
const mstRoleRouter = require("./roleRouter");

const router = express.Router();

// Set up your routes
router.use(mstRoleRouter);

module.exports = router;

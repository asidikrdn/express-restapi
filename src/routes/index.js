const express = require("express");
const mstRoleRouter = require("./roleRouter");
const mstUserRouter = require("./userRouter");

const router = express.Router();

// Set up your routes
router.use(mstRoleRouter);
router.use(mstUserRouter);

module.exports = router;
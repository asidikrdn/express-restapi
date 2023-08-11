const router = require("express").Router();
const {
  getAllRoles,
  getOneRole,
  updateRole,
  deleteRole,
  createRole,
} = require("../controllers/mstRoleController");
const { superadminAuth } = require("../middlewares/auth");

router.get("/roles", superadminAuth, getAllRoles); // get all roles
router.post("/roles/:id", superadminAuth, createRole); // get one role
router.get("/roles/:id", superadminAuth, getOneRole); // get one role
router.patch("/roles/:id", superadminAuth, updateRole); // get one role
router.delete("/roles/:id", superadminAuth, deleteRole); // get one role

module.exports = router;

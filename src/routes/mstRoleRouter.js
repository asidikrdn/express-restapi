const router = require("express").Router();
const {
  getAllRoles,
  getOneRole,
  updateRole,
  deleteRole,
  createRole,
} = require("../controllers/mstRoleController");
const { superadminAuth } = require("../pkg/middlewares/auth");

router.get("/roles", superadminAuth, getAllRoles); // get all roles
router.post("/roles/:id", superadminAuth, createRole); // get one role
router.get("/roles/:id", superadminAuth, getOneRole); // get one role
router.patch("/roles/:id", superadminAuth, updateRole); // get one role
router.delete("/roles/:id", superadminAuth, deleteRole); // get one role

// example documentation with swagger-jsdoc
/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get list of roles
 *     description: Retrieve a list of roles
 *     parameters:
 *       - in: path
 *         name: userId
 *         type: integer
 *         required: true
 *         description: Numeric ID of the user to get.
 *     responses:
 *       200:
 *         description: A list of roles
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 value:
 *                     {
 *                      "status": 200,
 *                      "message": "OK",
 *                      "totalData": 3,
 *                       "totalPage": 1,
 *                       "currentPage": 1,
 *                       "data": [
 *                        {
 *                          "id": 1,
 *                          "role": "Superadmin"
 *                         },
 *                        {
 *                          "id": 2,
 *                          "role": "Admin"
 *                        },
 *                        {
 *                          "id": 3,
 *                          "role": "User"
 *                        }
 *                      ]
 *                    }
 *
 */
// router.get("/roles", getAllRoles);

module.exports = router;

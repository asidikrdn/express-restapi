const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const {
  superadminAuth,
  adminAuth,
  userAuth,
} = require("../pkg/middlewares/auth");
const { uploadSingleImage } = require("../pkg/middlewares/uploadFile");

router.get("/users", adminAuth, userController.findAll); // get all users
router.get("/users/:id", userAuth, userController.findByID); // get user by id
router.patch("/users/:id", adminAuth, uploadSingleImage, userController.update); // update user by id
router.delete("/users/:id", superadminAuth, userController.delete); // delete user by id

router.post("/register", authController.register); // register user (with role = user)
router.post("/register/admin", adminAuth, authController.register); // register admin (with role = admin)
router.post("/login", authController.login); // register user (with role = user)
router.get("/checkauth", userAuth, authController.checkAuth); // check auth
router.post("/resend-otp", authController.resendOTP); // resend otp code to user
router.post("/verify-otp", authController.verifyOTP); // verify otp code

module.exports = router;

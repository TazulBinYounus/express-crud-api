const userController = require("../controllers/userController.js");
const router = require("express").Router();
const {
  userValidationRules,
  validate,
} = require("../validators/userValidator");
const verifyToken = require("../middleware/verifyToken");

router.get("/users", verifyToken, userController.getAllUser);
router.get("/users/:id", userController.getUserById);
router.post(
  "/user-create",
  userValidationRules(),
  validate,
  userController.createUser
);
router.post("/user-update/:id", userController.updateUser);
router.post("/user-delete/:id", userController.deleteUser);

module.exports = router;

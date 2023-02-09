const userController = require("../controllers/userController.js");
const router = require("express").Router();

router.get("/users", userController.getAllUser);
router.get("/users/:id", userController.getUserById);
router.post("/user-create", userController.createUser);
router.post("/user-update/:id", userController.updateUser);
router.post("/user-delete/:id", userController.deleteUser);

module.exports = router;

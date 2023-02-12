const authController = require("../controllers/authController.js");
const router = require("express").Router();

router.post("/login", authController.login);
router.post("/registration", authController.registration);

module.exports = router;

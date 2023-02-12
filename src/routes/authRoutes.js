const authController = require("../controllers/authController");
const refreshTokenController = require("../controllers/refreshTokenController");
const router = require("express").Router();

router.post("/login", authController.login);
router.post("/registration", authController.registration);
router.get("/refresh-token", refreshTokenController.handleRefreshToken);

module.exports = router;

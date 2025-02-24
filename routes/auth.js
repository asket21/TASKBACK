const Router = require("express");
const { checkAuth } = require("../middlewares/auth.js");
const router = new Router();
const authController = require("../controllers/authController");

router.post("/login", authController.authUser);
router.post("/logout", authController.logout);

module.exports = router;

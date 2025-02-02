const Router = require("express");

const router = new Router();
const userController = require("../controllers/userController");

router.get("/user", userController.getAllUsers);
router.get("/user/:id", userController.getUser);
router.post("/user", userController.createUser);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;

const Router = require("express")

const router = new Router()
const objectController = require("../controllers/objectController");

router.get("/object", objectController.getAllObjects);
router.get("/object/:id", objectController.getObject);
router.post("/object", objectController.createObject);
router.put("/object/:id", objectController.updateObject);
router.delete("/object/:id", objectController.deleteObject);

module.exports = router;

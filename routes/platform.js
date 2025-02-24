const Router = require("express")
const {  } = require("../middlewares/auth.js");
const router = new Router()

const platformControlerController = require('../controllers/platformControlerController.js')

router.get("/platform", platformControlerController.getAllPlatform);
router.post("/platform", platformControlerController.createPlatform);
module.exports = router;
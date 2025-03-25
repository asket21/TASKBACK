const Router = require("express")
const {  } = require("../middlewares/auth.js");
const router = new Router()

const platformControlerController = require('../controllers/platformControlerController.js')

router.get("/platform", platformControlerController.getAllPlatform);
router.post("/platform", platformControlerController.createPlatform);
router.get("/platform/:id", platformControlerController.getPlatformById);

module.exports = router;
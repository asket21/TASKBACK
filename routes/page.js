const pagesRouter = require("express").Router();

const {
  sendIndex,
  sendDashboard,
} = require("../controllers/authController.js");
const { checkAuth } = require("../middlewares/auth.js");
pagesRouter.get("/", sendIndex);
pagesRouter.get("/admin/**", checkAuth, sendDashboard);


module.exports = pagesRouter;

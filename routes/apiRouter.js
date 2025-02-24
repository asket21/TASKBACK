

const apiRouter = require("express").Router();


const objectsRouter = require("./objects");
const tasksRouter = require("./tasks");
const usersRouter = require("./users");
const authRouter = require("./auth");
const platformRouter = require('./platform')


apiRouter.use("/api", objectsRouter);
apiRouter.use("/api", tasksRouter);
apiRouter.use("/api", usersRouter);
apiRouter.use("/api", authRouter); 
apiRouter.use("/api", platformRouter); 


module.exports = apiRouter; 
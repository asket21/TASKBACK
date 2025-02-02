const Router = require("express")

const router = new Router()
const taskController = require("../controllers/taskController");

router.get("/tasks", taskController.getAllTasks);
router.get("/task/:id", taskController.getTask);
router.post("/task", taskController.createTask);
router.put("/task/:id", taskController.updateTask);
router.delete("/task/:id", taskController.deleteTask);

module.exports = router;

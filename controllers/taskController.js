const TaskModel = require("../db/models/TaskModel");
class taskController {
  async getAllTasks(req, res) {
    try {
      const searchQuery = req.query.q?.toLowerCase() || "";
      const tasks = await TaskModel.filterTasks(searchQuery);
      res.json(tasks);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllUsers(req, res) {
    try {
      const searchQuery = req.query.q?.toLowerCase() || "";
      const users = await UserModel.filterUsers(searchQuery);
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  }
  async getTask(req, res) {
    const id = parseInt(req.params.id, 10);
    try {
      const task = await sequelize.query(`SELECT * FROM tasks WHERE id = $1`, [
        id,
      ]);
      res.json(task.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async createTask(req, res) {
    const { object_id, link, manager_id, status } = req.body;

    try {
      console.log(req);
      const task = await sequelize.query(
        `INSERT INTO tasks (object_id, link, manager_id, status) VALUES ($1, $2, ,$3,$4) RETURNING *`,
        [object_id, link, manager_id, status]
      );
      res.json(task.rows);
    } catch (error) {
      console.log(error);
    }
  }
  async updateTask(req, res) {
    const id = parseInt(req.params.id, 10);
    const { object_id, link, manager_id, status } = req.body;

    try {
      const task = await sequelize.query(
        `UPDATE tasks SET object_id = $1, link =$2, manager_id, =$3 status =$4 WHERE id =$5 RETURNING *`,
        [object_id, link, manager_id, status, id]
      );
      res.json(task.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTask(req, res) {
    const id = req.params.id;
    const task = await sequelize.query(`DELETE FROM tasks WHERE id =$1 `, [id]);
    res.json(task.rows[0]);
  }
  catch(error) {
    console.log(error);
  }
}

module.exports = new taskController();

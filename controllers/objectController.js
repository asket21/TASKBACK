const pool = require("../db");

class ObjectController {
  async getAllObjects(req, res) {
    try {
      const object = await pool.query(`SELECT * FROM objects`);
      res.json(object.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async getObject(req, res) {
    const id = parseInt(req.params.id, 10);
    try {
      const object = await pool.query(`SELECT * FROM objects WHERE id = $1`, [id]);
      res.json(object.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async createObject(req, res) {
    
    const { title, manager_id, address } = req.body;

    try {
      console.log(req)
      const object = await pool.query(
        `INSERT INTO objects (title, address, manager_id) VALUES ($1, $2, $3) RETURNING *`,
        [title, address, manager]
      );
      res.json(object.rows);
    } catch (error) {
      console.log(error);
    }
  }
  async updateObject(req, res) {
    const id = parseInt(req.params.id, 10);
    const { title, address, manager_id } = req.body;

    try {
      const object = await pool.query(
        `UPDATE objects SET title = $1, address =$2 manager_id =$3 WHERE id =$4 RETURNING *`,
        [title, address, manager_id, id]
      );
      res.json(object.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteObject(req, res) {
    const id = req.params.id;
    const object = await pool.query(`DELETE FROM objects WHERE id =$1 `, [id]);
    res.json(object.rows[0]);
  }
  catch(error) {
    console.log(error);
  }
}

module.exports = new ObjectController();

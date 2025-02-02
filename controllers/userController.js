const pool = require('../db'),
bodyParser = require('body-parser')



class UserController {
    

    async getAllUsers(req, res) {


        try {
            const user = await pool.query(`SELECT * FROM users`)
            res.json(user.rows)

        } catch (error) {
            console.log(error)
        }

       
    }

    async getUser(req, res) {
        const id = parseInt(req.params.id, 10);
        try {
          const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
          res.json(user.rows);
        } catch (error) {
          console.log(error);
        }
      }

    async createUser(req, res) {
        
        const {name, email, role} = req.body

        if(!req.body) return res.sendStatus(400);
        

        try {
            const user = await pool.query(`INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING *`, [name,email,role]);
            res.json(user.rows)
        } catch (error) {
            console.log(error)
        }
    }
    async updateUser(req, res) {
        
        
        const id = parseInt(req.params.id, 10);
        console.log(req.body)
        const {name, email, role} = req.body

        try {
            const user = await pool.query(`UPDATE users SET name = $1, email =$2, role = $3 WHERE id =$4 RETURNING *`, [name, email, role, id]);
            res.json(user.rows)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteUser(req, res) {

        const id = req.params.id;
        const user = await pool.query(`DELETE FROM  users WHERE id =$1 `, [id]);
            res.json(user.rows[0])
        } catch (error) {
            console.log(error)
        }
    }

module.exports = new UserController();
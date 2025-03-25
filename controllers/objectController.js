const ObjectModel = require("../db/models/ObjectModel");

class ObjectController {
  async getAllObjects(req, res) {
    try {
      const searchQuery = req.query.q?.toLowerCase() || "";
      const objects = await ObjectModel.filterObjects(searchQuery);
      console.log(searchQuery);
      res.json(objects);
    } catch (error) {
      res.status(500).send("Ошибка поиска объектов");
    }
  }

  async getObject(req, res) {
    const id = parseInt(req.params.id, 10);
    try {
      const object = await ObjectModel.findByPk(id);
      console.log(object);
      res.json(object);
    } catch (error) {
      console.log(error);
    }
  }

  async createObject(req, res) {
    try {
      const objects = req.body;

      if (!Array.isArray(objects)) {
        try {
          const { title, manager_id, address, platform, id } = req.body;
          const existingObject = await ObjectModel.findOne({
            where: { title },
          });
          if (existingObject) {
            return res.status(400).send("Объект существует");
          }
          const newObject = await ObjectModel.create({
            title,
            manager_id,
            address,
            platform,
            id,
          });
          console.log(newObject.id);
          res.send("Объект создан! ID: " + newObject.title);
        } catch (error) {
          res.status(500).send("Ошибка создания объекта: " + err.message);
        }
      }
      const results = [];
      for (const objectData of objects) {
        const { title, manager_id, address, platform, id } = objectData;

        const existingObject = await ObjectModel.findOne({ where: { title } });
        if (existingObject) {
          results.push({ id, title, status: "Уже существует" });
          continue;
        }

        const newObject = await ObjectModel.create({
          title,
          manager_id,
          address,
          platform,
          id,
        });
        results.push({ id: newObject.id, title, status: "Объект Создан" });
      }
      res.json(results);
    } catch (error) {
      res.status(500).send("Ошибка создания объекта: " + error.message);
    }
  }

  async updateObject(req, res) {
    const id = parseInt(req.params.id, 10);
    const updatedData = req.body;

    try {
      const object = await ObjectModel.update(updatedData, {
        where: { id },
      });
      res.status(200).json({ message: "Объект отредактирован!" });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteObject(req, res) {
    const id = req.params.id;
    const object = await sequelize.query(`DELETE FROM objects WHERE id =$1 `, [
      id,
    ]);
    res.json(object.rows[0]);
  }
  catch(error) {
    console.log(error);
  }
}

module.exports = new ObjectController();

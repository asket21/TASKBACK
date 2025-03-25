const PlatformModel = require("../db/models/PlatformModel");
const sequelize = require("../db/db");

class PlatformController {
  async getAllPlatform(req, res) {
    try {
      const platforms = await PlatformModel.findAll();
      res.json(platforms);
    } catch (error) {
      console.log(error);
    }
  }

  async getPlatformById(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await PlatformModel.findOne({
        where: { id },
      });
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  }

  async createPlatform(req, res) {
    try {
      const platforms = req.body;

      // Проверяем, что тело запроса - массив
      if (!Array.isArray(platforms)) {
        try {
          const { id, title } = platforms;
          const existingPlatform = await PlatformModel.findOne({
            where: { title },
          });
          if (existingPlatform) {
            return res.status(400).send("Платформа уже существует");
          }
          const newPlatform = await PlatformModel.create({
            id,
            title,
          });
          res.send("Платформа создана! ID: " + newPlatform.id);
        } catch (error) {
          res.status(500).send("Ошибка создания флатформы: " + err.message);
        }
      }
      const results = [];

      // Обрабатываем каждую платформу последовательно
      for (const platformData of platforms) {
        const { id, title } = platformData;

        // Проверка существования платформы
        const existingPlatform = await PlatformModel.findOne({
          where: { title },
        });
        if (existingPlatform) {
          results.push({ id, title, status: "Уже существует" });
          continue;
        }

        // Создание новой платформы
        const newPlatform = await PlatformModel.create({ id, title });
        results.push({ id: newPlatform.id, title, status: "Создана" });
      }

      res.json(results);
    } catch (err) {
      res.status(500).send("Ошибка создания платформ: " + err.message);
    }
  }
}

module.exports = new PlatformController();

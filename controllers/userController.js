const userModel = require("../db/models/usersModel");
const sequelize = require("../db/db");

class UserController {
  async getAllUsers(req, res) {
    try {
      const searchQuery = req.query.q?.toLowerCase() || "";
      const users = await userModel.filterUsers(searchQuery);
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  }

  async putUserPassword(req, res) {
    try {
      const { id } = req.params;
      const { password } = req.body;
      const user = await userModel.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      await userModel.update({ password: password }, { where: { id } });

      res.status(200).json({ message: "Пароль успешно изменен" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ошибка сервера при изменении пароля",
        error: error.message,
      });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params.id;
      const user = await userModel.findOne({
        where: { id },
        attributes: { exclude: ["password"] }, // Исключаем поле password из результатов
      });
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  }

  async createUser(req, res) {
    try {
      const users = req.body;
      // Проверяем, что тело запроса - массив
      if (!Array.isArray(users)) {
        try {
          const existingUser = await userModel.findOne({ where: { login } });
          if (existingUser) {
            return res.status(400).send("Пользователь уже существует");
          }

          const newUser = await userModel.create({
            id,
            login,
            password,
            name,
            role,
          });
          res.send("Пользователь создан! ID: " + newUser.id);
        } catch (err) {
          res.status(500).send("Ошибка создания пользователя: " + err.message);
        }
      }

      const results = [];

      for (const userData of users) {
        const { id, login, password, name, role } = userData;

        const existingUser = await userModel.findOne({ where: { name } });
        if (existingUser) {
          results.push({ id, name, status: "Уже существует" });
          continue;
        }

        const newUser = await userModel.create({
          id,
          login,
          password,
          name,
          role,
        });
        results.push({ id: newUser.id, name, status: "Пользователь Создан" });
      }

      res.json(results);
    } catch (err) {
      res.status(500).send("Ошибка создания пользователя: " + err.message);
    }
  }

  async updateUser(req, res) {
    console.log(req.params, req.body);
    const { id } = req.params;
    const { login, name, role } = req.body;

    try {
      const [affectedCount] = await userModel.update(
        {
          login,
          name,
          role,
        },
        {
          where: { id },
        }
      );

      if (affectedCount === 0) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }

      // const updatedUser = await userModel.findByPk(id); // Получаем обновленную запись

      res.send("Пользователь отредактирован!");
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Ошибка при обновлении пользователя",
        details: error.message,
      });
    }
  }

  async getUserByRole(req, res) {
    try {
      const { role } = req.params;

      if (!["manager", "admin", "engineer"].includes(role)) {
        return res.status(400).json({ message: "Недопустимая роль" });
      }

      const usersByRole = await userModel.findByRole(role);
      res.json(usersByRole);
    } catch (error) {
      res.status(500).json({ message: "Ошибка получения пользователей" });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      console.log(id);

      await userModel.destroy({
        where: { id },
        cascade: false, // Если нужно каскадное удаление связанных данных
      });
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();

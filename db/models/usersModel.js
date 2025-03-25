const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const UserModel = sequelize.define(
  "UserModel",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    login: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      set(value) {
        // Хеширование пароля перед сохранением
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue("password", hash);
      },
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      onUpdate: DataTypes.NOW,
    },
  },
  {
    tableName: "users", // явное указание имени таблицы
    timestamps: false, // отключаем автоматические timestamps (createdAt и updatedAt)
  }
);

UserModel.prototype.getPublicProfile = function () {
  return {
    id: this.id,
    login: this.email,
    role: this.role,
  };
};
UserModel.filterUsers = function (searchQuery) {
  return UserModel.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.iLike]: `%${searchQuery}%` } }, // Регистронезависимый поиск
        { login: { [Op.iLike]: `%${searchQuery}%` } },
      ],
    },
    attributes: {
      exclude: ["password"],
    },
  });
};

UserModel.findByRole = function (role) {
  return UserModel.findAll({
    where: { role: role },
    attributes: {
      exclude: ["password"],
    },
  });
};

UserModel.prototype.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = UserModel;

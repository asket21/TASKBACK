const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const PlatformModel = sequelize.define(
  "PlatformModel",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
      defaultValue: "Уточни у менеджера, попроси админа отредактировать",
    },
  },

  {
    tableName: "platforms", // Явное указание имени таблицы
    timestamps: false, // Отключаем автоматические поля createdAt и updatedAt
  }
);

module.exports = PlatformModel;

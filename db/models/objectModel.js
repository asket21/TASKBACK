const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const { Op } = require("sequelize");
const ObjectModel = sequelize.define(
  "ObjectModel",
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
    },

    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "Добавьте адрес",
    },
    telegram_object_chat_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    telegram_object_chat_link: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Добавьте ссылку на чат объекта",
    },
    platform: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: "platforms",
        key: "id",
      },
    },
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: "users",
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: "objects",
    timestamps: false,
    underscored: true,
  }
);

ObjectModel.filterObjects = function (searchQuery) {
  return ObjectModel.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.iLike]: `%${searchQuery}%` } }, // Регистронезависимый поиск
        { address: { [Op.iLike]: `%${searchQuery}%` } },
      ],
    },
  });
};

ObjectModel.associate = (models) => {
  ObjectModel.belongsTo(models.User, {
    foreignKey: "manager_id",
    as: "managerinfo",
  });

  ObjectModel.belongsTo(models.Platform, {
    foreignKey: "platform",
    targetKey: "id",
    as: "platformInfo",
  });
};

module.exports = ObjectModel;

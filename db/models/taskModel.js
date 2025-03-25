const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const { Op } = require('sequelize');


const TaskModel = sequelize.define('TaskModel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Добавляем автоинкремент, если это требуется
    },
    number: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
      },
    object_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'objects', // Ссылка на таблицу objects
        key: 'id'
        },
        onDelete: 'CASCADE' // Каскадное удаление
    },
    link: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    manager_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'users', // Ссылка на таблицу users
        key: 'id'
        }
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
         type: DataTypes.ENUM('Принято', 'В работе', 'Завершено'),
  defaultValue: 'Принято',
        allowNull: false,
        defaultValue: 'Принято' 
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: DataTypes.NOW
    }
    }, {
    tableName: 'tasks', // Явное указание имени таблицы
    timestamps: false // Отключаем автоматические поля createdAt и updatedAt
    });

TaskModel.filterTasks = function (searchQuery) {
  return TaskModel.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.iLike]: `%${searchQuery}%` } }, // Регистронезависимый поиск
        { login: { [Op.iLike]: `%${searchQuery}%` } },
      ],
    },
    
  });

};

TaskModel.associate = (models) => {
    TaskModel.belongsTo(models.User, {
      foreignKey: "manager_id",
      as: "managerinfo",
    });
    TaskModel.belongsTo(models.Object, {
        foreignKey: "object",
        targetKey: "id",
        as: "objectInfo",
      });
};

module.exports = TaskModel;

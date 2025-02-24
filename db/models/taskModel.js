const { DataTypes } = require('sequelize');
const sequelize = require('../db');



const TaskModel = sequelize.define('TaskModel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Добавляем автоинкремент, если это требуется
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
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'Принято' // Значение по умолчанию
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
    
    module.exports = TaskModel;

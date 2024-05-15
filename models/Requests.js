const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/connection");
class Requests extends Model {}

Requests.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    delivered: {
        type: DataTypes.BOOLEAN,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    zipcode: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    menu_id: {
        type: DataTypes.INTEGER,
        references: {
        model: 'menu',
        key: 'id',
        unique: false
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
        model: 'user',
        key: 'id',
        unique: false
        }
    }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "requests"
    }
);
module.exports = Requests;
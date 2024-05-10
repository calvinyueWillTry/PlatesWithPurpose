const { Model, DataTypes } = require('sequelize');
const sequelize = require("../Models/connection");
class Requests extends Model {}
Requests.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true, 
            foreignKey: "user_type",
            foreignKey: "restaurants",
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
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "requests"
    }
);
module.exports = Requests;
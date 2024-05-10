const { Model, DataTypes } = require('sequelize');
const sequelize = require("./Models/connection");
class Restaurants extends Model {}
Restaurants.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true, 
        },
        restaurant_name: {
            type: DataTypes.STRING,//VARCHAR?
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        time_to_prepare: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "restaurants"
    }
);
module.exports = Restaurants;

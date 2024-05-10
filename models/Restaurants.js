const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/connection");
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
        
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "restaurants"
    }
);
module.exports = Restaurants;

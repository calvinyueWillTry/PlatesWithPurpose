const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/connection");
class Menu extends Model {}
Menu.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true, 
        },
        menuItem_name: {
            type: DataTypes.STRING,//VARCHAR?
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            defaultValue: 0,
        },
        time_to_prepare: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10,
        },
        cost: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            defaultValue: 0,
        }
    },
    {
            sequelize,
            freezeTableName: true,
            underscored: true,
            modelName: "menu"
    },
);
module.exports = Menu

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
        },
        time_to_prepare: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        cost: {
            type: DataTypes.DECIMAL,
            allowNull: false,
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

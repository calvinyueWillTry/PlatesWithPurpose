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
            type: DataTypes.TEXT,//VARCHAR?
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL, //decimals not coming through
            allowNull: true,
            defaultValue: 0,
        },
        time_to_prepare: { //produced as 2024-05-15 00:17:30
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10,
        },
        cost: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        file_name: {
            type: DataTypes.STRING,
            allowNull: true, 
        
        }
    },
    { //where is created_at and updated_at coming from?
            sequelize,
            freezeTableName: true,
            underscored: true,
            modelName: "menu"
    },
);
module.exports = Menu

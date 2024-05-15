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
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // restaurant_reference: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //     model: 'menu',
        //     key: 'id',
        //     unique: false
        //     }
        //  },
    },
    {//where is created_at and updated_at coming from?
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "restaurants"
    }
);
module.exports = Restaurants;

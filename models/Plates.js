const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/connection");

class Plates extends Model {}
Plates.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    delivered: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    paid_for: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    date_order: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
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
        modelName: "plates"
    }
);
module.exports = Plates;
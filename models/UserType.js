const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserType extends Model { }

UserType.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        receiver: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user_type',
    }
);

module.exports = UserType;


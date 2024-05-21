const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class EmailLog extends Model {
    
}
EmailLog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        emailInquiry: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        textSubject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        inquire: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'EmailLog',
    }
)

module.exports = EmailLog;
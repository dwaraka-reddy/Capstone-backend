const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Hire extends Model {}

Hire.init({
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    workerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending' // wether work is pending,accepted,rejected
    }
}, {
    sequelize,
    modelName: 'hire'
});

module.exports = Hire;

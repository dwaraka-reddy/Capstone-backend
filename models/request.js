const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Request extends Model {}

Request.init({
    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'completed'),
        defaultValue: 'pending'
    }
}, {
    sequelize,
    modelName: 'Request'
});

module.exports = Request;

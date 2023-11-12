const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}


User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    name: DataTypes.STRING,
    alternateMobile: DataTypes.STRING,
    address: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    pincode: DataTypes.STRING,
    gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        allowNull: true
    },
    expertise: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Array datatype for PostgreSQL
        allowNull: true
    },
    isStep2Completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isStep3Completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: 'user'
});

module.exports = User;
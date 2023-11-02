const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Post extends Model {}

Post.init({
    name: DataTypes.STRING,
    work: DataTypes.STRING,
    description: DataTypes.STRING,
    willingToPay: DataTypes.STRING,
    mobile: DataTypes.STRING
}, {
    sequelize,
    modelName: 'post'
});

module.exports = Post;

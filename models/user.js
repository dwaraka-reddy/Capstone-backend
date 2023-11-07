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
        allowNull: false
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
    }
}, {
    sequelize,
    modelName: 'User'
});

module.exports = User;







// User.init({
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password: DataTypes.STRING,
//     userType: DataTypes.STRING,  // "worker" or "customer"
//     name: DataTypes.STRING,
//     mobile: DataTypes.STRING,
//     alternateMobile: DataTypes.STRING,
//     address: DataTypes.STRING,
//     state: DataTypes.STRING,
//     city: DataTypes.STRING,
//     pincode: DataTypes.STRING,
//     gender: {
//         type: DataTypes.ENUM('male', 'female', 'other'),
//         allowNull: true
//     },
//     expertise: {
//         type: DataTypes.ARRAY(DataTypes.STRING),
//         allowNull: true
//     }
// }, {
//     sequelize,
//     modelName: 'user'
// });

// module.exports = User;




// validate: {
//     isAllowed(value) {
//         const allowedExpertises = ['plumbing', 'electrician', 'carpentry']; // Add more as needed
//         for (let expertise of value) {
//             if (!allowedExpertises.includes(expertise)) {
//                 throw new Error(`Invalid expertise: ${expertise}. Allowed values are: ${allowedExpertises.join(', ')}`);
//             }
//         }
//     }
// }
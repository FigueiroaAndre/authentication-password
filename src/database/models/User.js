const { DataTypes } = require('sequelize');
const connection = require('../connection');

const User = connection.define('User',{
    login: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    info: DataTypes.TEXT,
},{
    tableName: 'Users',
});

module.exports = User;

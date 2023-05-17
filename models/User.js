const dotenv = require('dotenv').config()
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    dialect: 'mysql'
});

class User extends Model { }
User.init({
    Nome: {
        type: Sequelize.STRING
    },
    Sobrenome: {
        type: Sequelize.STRING
    },
    Idade: {
        type: Sequelize.TINYINT
    },
    Email: {
        type: Sequelize.STRING
    }
}, { sequelize, modelName: 'usuarios' });

module.exports = User;
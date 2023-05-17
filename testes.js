const dotenv = require('dotenv').config()
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env

const Sequelize = require('sequelize');
const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  dialect: 'mysql'
});

const Postagem = sequelize.define('postagens',{
  titulo: {
    type: Sequelize.STRING
  },
  conteudo: {
    type: Sequelize.TEXT
  }
});

const Usuario = sequelize.define('usuarios', {
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
})

Usuario.sync()
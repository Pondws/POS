const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_workshop_pos', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
  });

module.exports = sequelize
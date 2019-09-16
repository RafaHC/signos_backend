let Sequelize = require('sequelize');
let pg = require('pg');
pg.defaults.ssl = true;

const connection = new Sequelize(process.env.DATABASE_URL || '');

connection.authenticate()
    .then(() => console.log('Conexao estabelecida'))
    .catch((err) => console.log("Ocorreu um erro " + err))
    .done();
module.exports = connection;
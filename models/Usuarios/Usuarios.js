let Sequelize = require('sequelize');
let Database = require('../../config/connection');

let Usuarios = {

    init: () => {

        const Usuarios = Database.define('usuarios', {
            usuario: Sequelize.STRING,
            senha: Sequelize.STRING,
            email: Sequelize.STRING,
            createdAt: {
                type: Date,
                default: Date.now
            }
        })

        return Usuarios;
    }
}

module.exports = Usuarios;
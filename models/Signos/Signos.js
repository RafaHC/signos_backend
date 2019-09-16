let Sequelize = require('sequelize');
let Database = require('../../config/connection');

let Signos = {

    init: () => {
        const Signos = Database.define('signos', {
            nome: Sequelize.STRING,
            data_inicio: Sequelize.STRING,
            data_fim: Sequelize.STRING,
            usuarioid: Sequelize.INTEGER,
            descricao: Sequelize.STRING,
            createdAt: {
                type: Date,
                default: Date.now
            }
        })

        return Signos;
    }
}

module.exports = Signos;
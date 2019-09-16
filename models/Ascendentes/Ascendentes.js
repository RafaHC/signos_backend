

let Sequelize = require('sequelize');
let Database = require('../../config/connection');

let Ascendentes = {

    init: () => {
        const Ascendentes = Database.define('ascendentes', {
            nome: Sequelize.STRING,
            hora_inicio: Sequelize.TIME,
            hora_fim: Sequelize.TIME,
            signoid: Sequelize.INTEGER,
            descricao: Sequelize.STRING,
            createdAt: {
                type: Date,
                default: Date.now
            }
        })

        return Ascendentes;
    }
}

module.exports = Ascendentes;
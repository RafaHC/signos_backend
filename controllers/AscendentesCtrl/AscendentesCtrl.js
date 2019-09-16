let ascendentes = require('../../models/Ascendentes/Ascendentes').init();

let SignosCtrl = {
    index: async (req, res) => {
        let pesquisa = await ascendentes.findAll({ where: { signoid: req.params.id } })

        return res.json(pesquisa);
    },
    create: async (req, res) => {
        let ascendente = await ascendentes.create(req.body);
        req.io.emit('ascendente', ascendente);
        return res.json(ascendente);
    },
    delete: (req, res) => {
        let result = ascendentes.destroy({
            where: {
                id: req.params.id
            }
        })

        return res.send(result);
    }
}

module.exports = SignosCtrl;
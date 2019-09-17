let ascendentes = require('../../models/Ascendentes/Ascendentes').init();

let SignosCtrl = {
    index: async (req, res) => {
        let pesquisa = await ascendentes.findAll({ where: { signoid: req.params.id } })

        return res.json(pesquisa);
    },
    create: async (req, res) => {
        req.assert('nome', 'Nome é obrigatório!').notEmpty();
        req.checkBody('nome', 'Nome deve ter minimo de 4 caracteres e máximo de 20').isLength({ min: 4, max: 20 });
        req.assert('hora_inicio', 'hora_inicio é obrigatório!').notEmpty();
        req.assert('hora_fim', 'hora_fim é obrigatório!').notEmpty();
        req.assert('signoid', 'signoid é obrigatório!').notEmpty();
        let erros = req.validationErrors();

        if (erros) {
            res.status(400).json(erros)
            return;
        }

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
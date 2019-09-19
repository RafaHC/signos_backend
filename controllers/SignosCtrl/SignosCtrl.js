let signos = require('../../models/Signos/Signos').init();

let SignosCtrl = {
    index: async (req, res) => {
        let pesquisa = await signos.findAll({ where: { usuarioid : req.params.id}})

        return res.json(pesquisa);
    },
    create: async (req, res) => {
        req.assert('nome', 'Nome é obrigatório!').notEmpty();
        req.checkBody('nome', 'Nome deve ter minimo de 4 caracteres e máximo de 20').isLength({ min: 4, max: 20 });
        req.assert('data_inicio', 'data_inicio é obrigatório!').notEmpty();
        req.assert('data_fim', 'data_fim é obrigatório!').notEmpty();
        req.assert('usuarioid', 'usuarioid é obrigatório!').notEmpty();
        let erros = req.validationErrors();

        if (erros) {
            res.status(400).json(erros)
            return;
        }


        const signo = await signos.findOne({ where: { nome: req.body.nome, usuarioid: req.body.usuarioid } });
        if (signo) {
            return res.status(400).json({ message: 'Este signo já existe' });
        }
        
        let result = await signos.create(req.body);
        req.io.emit('signo', result);
        return res.json(result);
    },
    delete: (req, res) => {
        let result = signos.destroy({
            where: {
                id: req.params.id
            }
        })

        return res.send(result);
    }
}

module.exports = SignosCtrl;
let signos = require('../../models/Signos/Signos').init();

let SignosCtrl = {
    index: async (req, res) => {
        let pesquisa = await signos.findAll({ where: { usuarioid : req.params.id}})

        return res.json(pesquisa);
    },
    create: async (req, res) => {
        let signo = await signos.create(req.body);
        req.io.emit('signo', signo);
        return res.json(signo);
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
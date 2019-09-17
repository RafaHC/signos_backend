const bcrypt = require('bcrypt');
let usuarios = require('../../models/Usuarios/Usuarios').init();
const jwt = require('jsonwebtoken');

let config = require('./../../config/config');

let UsuariosCtrl = {
    create: async (req, res) => {
        req.assert('usuario', 'Usuario é obrigatório!').notEmpty();
        req.checkBody('usuario', 'Usuario deve ter minimo de 5 caracteres e máximo de 20').isLength({ min: 5, max: 20 });
        req.assert('senha', 'Senha é obrigatório!').notEmpty();
        let erros = req.validationErrors();

        if (erros) {
            res.status(400).json(erros)
            return;
        }

        const usuario = await usuarios.findOne({ where: { usuario: req.body.usuario } });
        if(usuario){
            return res.status(400).json({message: 'Este usuario já existe'});
        }
        let senha = req.body.senha;
        let result;
        bcrypt.hash(senha, 5, async (err, hash) => {
            
            let obj = {
                usuario: req.body.usuario,
                senha: hash,
                email: req.body.email
            }

            result = await usuarios.create(obj);

            return res.json({
                id: result.id,
                usuario: result.usuario,
                email: result.email
            });
        });
    },

    delete: (req, res) => {
       let result = usuarios.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.send(result);
    },

    login: async (req, res) => {
            req.assert('usuario', 'Usuario é obrigatório!').notEmpty();
            req.assert('senha', 'Senha é obrigatório!').notEmpty();
            let erros = req.validationErrors();

            if (erros) {
                res.status(400).json(erros)
                return;
            }
            
           let match;
           let usuario = req.body;
           const usuarioEncontrado = await usuarios.findOne({ where: { usuario: usuario.usuario } });
           if (usuarioEncontrado) {
               match = await bcrypt.compare(usuario.senha, usuarioEncontrado.dataValues.senha);
           }
           if (!usuarioEncontrado || !match) {
              
                res.status(400).json({ erro: true, message: 'Dados invalidos' });

           } else {
               
            let token = jwt.sign({ usuario: usuarioEncontrado.usuario },
                   config.secret,
                   {
                       expiresIn: '24h'
                   }
               );
               
               res.json({ 
                   id: usuarioEncontrado.id,
                   nome: usuarioEncontrado.usuario,
                   senha: usuarioEncontrado.senha,
                   token: token,
                   email: usuarioEncontrado.email
               });
           }
    }

   

}


module.exports = UsuariosCtrl;
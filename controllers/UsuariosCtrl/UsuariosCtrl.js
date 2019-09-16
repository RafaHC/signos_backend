const bcrypt = require('bcrypt');
let usuarios = require('../../models/Usuarios/Usuarios').init();
const jwt = require('jsonwebtoken');

let config = require('./../../config/config');

let UsuariosCtrl = {
    index: async (req, res) => {
        const result = await usuarios.findAll({});
        res.json(result);
    },

    create: async (req, res) => {
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
            delete result.senha;
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

    login: (usuario) => {
       return new Promise(async (resolve, reject) => {
           let match;
           const usuarioEncontrado = await usuarios.findOne({ where: { usuario: usuario.usuario } });
           if (usuarioEncontrado) {
               match = await bcrypt.compare(usuario.senha, usuarioEncontrado.dataValues.senha);
           }
           if (!usuarioEncontrado || !match) {
               reject({ erro: true, message: 'Dados invalidos' });
           } else {
               let token = jwt.sign({ usuario: usuarioEncontrado.usuario },
                   config.secret,
                   {
                       expiresIn: '24h' // expires in 24 hours
                   }
               );
               resolve({ id: usuarioEncontrado.id, nome: usuarioEncontrado.usuario, senha: usuarioEncontrado.senha, token: token, email: usuarioEncontrado.email });
           }
       })
    }

   

}


module.exports = UsuariosCtrl;
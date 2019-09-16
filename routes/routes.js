
let _ = require('lodash');
let UsuariosCtrl = require('./../controllers/UsuariosCtrl/UsuariosCtrl');
let SignosCtrl = require('./../controllers/SignosCtrl/SignosCtrl');
let AscendentesCtrl = require('./../controllers/AscendentesCtrl/AscendentesCtrl');

module.exports = (app, middleware) => {
    app.post('/usuarios', UsuariosCtrl.create);
    app.post('/login', async (req, res) => {
       UsuariosCtrl.login(req.body)
       .then((data) => res.json(data))
        .catch(err => res.json(err));
    });
    app.delete('/usuarios/:id', UsuariosCtrl.delete);
    app.get('/signos/:id',  middleware.checkToken , SignosCtrl.index);
    app.post('/signos',  middleware.checkToken , SignosCtrl.create);
    app.delete('/signos/:id',  middleware.checkToken , SignosCtrl.delete);
    app.get('/ascendentes/:id',  middleware.checkToken , AscendentesCtrl.index);
    app.post('/ascendentes',  middleware.checkToken , AscendentesCtrl.create);
    app.delete('/ascendentes/:id',  middleware.checkToken , AscendentesCtrl.delete);


}
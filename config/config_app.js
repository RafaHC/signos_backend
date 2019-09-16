// Módulos
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
let middleware = require('./middleware.js');

let app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    req.io = io;
    return next();
});

http.listen(process.env.PORT || 3000, () => console.log('Server Rodando'))

module.exports = {
    app: app,
    middleware: middleware
};


// Módulos
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
let middleware = require('./middleware.js');
let expressValidator  = require('express-validator');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(expressValidator());

app.use((req, res, next) => {
    req.io = io;
    return next();
});

http.listen(process.env.PORT || 4000, () => console.log('Server Rodando'))

module.exports = {
    app: app,
    middleware: middleware
};
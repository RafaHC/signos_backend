let app = require('./config/config_app').app;
let middleware = require('./config/config_app').middleware;
require('./routes/routes')(app, middleware);
var express     = require('express');
var app         = express();
var server      = require('http').Server(app);
var ejs         = require('ejs');
var bodyParser  = require('body-parser');
var session     = require('express-session');
var passport    = require('passport');
var favicon     = require('serve-favicon');
var morgan      = require('morgan');
var path        = require('path');
var io          = require('socket.io')(server);
var config      = require('./config/server');


//configuration
require('./app/service/mongo-db');
require('./app/service/passport-auth');
app.set('views', path.join(__dirname, '/public/view')); //set path where search view, default nodeTestApp/views
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

//static files
app.use(express.static(path.join(__dirname, '/public/')));  //for css, js
app.use(express.static(path.join(__dirname, '/public/view'))); //need because app.set('views')
app.use(favicon(path.join(__dirname,'/public/img/favicon.ico')));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//need only for auth with passportjs.org
app.use(session({ secret: require('./config/auth').twitter.sessionSecret, resave: true, saveUninitialized: true }));

//log every request to the console
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//controllers
require('./app/controller/')(app);
require('./app/service/chat')(io);

server.listen(process.env.PORT || config.port);
console.log("App listening ...");

exports = module.exports = app;
module.exports = function(app){
var fs = require('fs');

    app.use(require('./auth'));
    app.use(require('./chat'));
    app.use(require('./data'));

    app.all('*', function(req, res){
        console.log('index1');
        res.render('index');
    });

    app.use(require('./error'));

};


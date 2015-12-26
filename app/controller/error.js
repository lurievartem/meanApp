var msg     = require('../data/messages');
var express = require('express');
var router  = express.Router();

router.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.render('views/500');
});

module.exports = router;
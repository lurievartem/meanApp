var jwt     = require('../service/jwt-auth');
var msg     = require('../data/messages');
var User    = require('../models/user-model');
var express = require('express');
var router  = express.Router();

router.get('/user/get', jwt.check,  function(req, res){
    User.findOne({ username : req.decode.username }, function(err, data){
        if(err) throw err;

        if(data){
            res.status(200).send({ name: data.name, date: data.date, role: data.role, logo: data.logo, gender: data.gender });
        }
    });
});

module.exports = router;
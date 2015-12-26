var jwt     = require('../service/jwt-auth');
var Chat    = require('../models/chat-model');
var express = require('express');
var router  = express.Router();

router.post('/messages', jwt.check, function(req, res){
    var roomName = req.body.roomName;
    Chat.getRoomMessages(roomName, function(err, data){
        if(err) throw err;
        res.status(200).send(data);
    });
});

router.get('/rooms', jwt.check, function(req, res){
    Chat.getRoomsName(function(err, data){
        if(err) throw err;
        res.status(200).send(data);
    });
});

module.exports = router;


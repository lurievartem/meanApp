var msg  = require('../data/messages');
var jwt  = require('jsonwebtoken');
var auth = require('../../config/auth');

function check(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        jwt.verify(token, auth.secret, function(err, decoded){
            if(err){
                return res.json({ success: false, errorId: "3", message: msg["3"] });
            } else{
                req.decode = decoded;
                next();
            }
        });
    } else{
        res.status(401).send({ success: false, errorId: "4", message: msg["4"] });
    }
}

function sign(user, expiresTime){
    return jwt.sign(user, auth.secret, { expiresIn: expiresTime || auth.expiresTime });
}


module.exports = {
    check: check,
    sign: sign
};
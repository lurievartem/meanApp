var jwt         = require('../service/jwt-auth');
var crypt       = require('../service/crypt-password');
var msg         = require('../data/messages');
var passport    = require('passport');
var mail        = require('../service/mailer');
var User        = require('../models/user-model');
var express     = require('express');
var router      = express.Router();

require('../service/passport-auth');

router.post('/auth', function(req, res, next){
    if(!req.body.username || !req.body.password){
        return res.status(400).json({ success: false, errorId: "6", message: msg["6"]});
    }

    passport.authenticate('local', function(data){
        User.findOne({username: data.username, type: ''}, function(err, user){
            if(err) throw err;

            if(!user){
                return res.json({ success: false, errorId: "1", message: msg["1"] });
            }

            if(!crypt.checkPassword(data.password, user.password)){
                return res.json({ success: false, errorId: "2", message: msg["2"] });
            }

            return res.json({ success: true, token: jwt.sign({ username: user.username, password: user.password }), name: user.name });
        });
    })(req, res);
});

router.get('/auth/facebook', passport.authenticate('facebook', { session: false, scope: []}));
router.get('/auth/facebook/callback', passport.authenticate('facebook',{ session: false, failureRedirect: '/error'}), function(req, res){
        res.redirect("/profile?access_token=" + req.user.token + "&name=" + req.user.name);
    }
);

router.get('/auth/twitter', passport.authenticate('twitter', { session: false, scope: []}));
router.get('/auth/twitter/callback', passport.authenticate('twitter', { session: false, failureRedirect: '/error'}), function(req, res){
        res.redirect("/profile?access_token=" + req.user.token + "&name=" + req.user.name);
    }
);

router.get('/auth/google', passport.authenticate('google', { session: false, scope : ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/error'}), function(req, res){
        res.redirect("/profile?access_token=" + req.user.token + "&name=" + req.user.name);
    }
);

router.post('/auth/forgot-password', function(req, res, next){
    if(!req.body.email) return res.status(400).json({ success: false, errorId: "5", message: msg["5"]});

    User.findOne({username: req.body.email, type: ''}, function(err, user){
        if(err) throw err;

        if(!user){
            res.status(400).json({ success: false, errorId: "5", message: msg["5"]});
        }

        mail.sendEmail('forgot', { to: user.username, token: jwt.sign({ username: user.username, password: user.password }) }).then(function(response){
            console.log('send' + response); //todo log success action
        }).catch(function(err){
            console.log('error forgot-password');
            next(err);
        });

        return res.status(200).json({ success: true});
    });
});

router.post('/auth/change-password', jwt.check, function(req, res){
    if(!req.body.password) return res.status(400).json({ success: false, errorId: "5", message: msg["5"]});

    //todo regex check password

    User.findOne({username: req.decode.username, type: ''}, function(err, user){
        if(err) throw err;

        if(!user || req.decode.password != user.password){
            return res.status(400).json({ success: false, errorId: "5", message: msg["5"]});
        }

        if(crypt.checkPassword(req.body.password, user.password)){
            return res.status(400).json({ success: false, errorId: "9", message: msg["9"]});
        }

        user.update({ password: crypt.hashPassword(req.body.password)}, function(err){
            if(err) throw err;
            console.log('changed');
            return res.status(200).json({ success: true, message: msg["10"] });
        });
    });
});

router.post('/user/save', function(req, res){
    var body = req.body;

    if(!body.username || !body.password || !body.name || !body.date ){
        return res.json({ success: false, errorId: "5", message: msg["5"] });
    }

    body.password = crypt.hashPassword(body.password);

    User.save(body, function(err, user){
        if(err) throw err;
        return res.json({ success: true, token: jwt.sign({ username: user.username, password: user.password }), name: user.name });
    });

});

module.exports = router;
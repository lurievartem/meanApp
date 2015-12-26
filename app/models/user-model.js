var mongoose = require('mongoose');
var Schema = mongoose.Schema;

User = mongoose.model('User', new Schema({
    username: { type: String, required: true},
    password: { type: String, required: true },
    name: { type: String, required: true},
    date: { type: Date },
    gender: { type: String },
    logo: { name: String,
            dataUrl: String,
    },
    role: { type: String, default: '' },
    created_at: { type: Date, default: Date.now},
    type: { type: String, default: '' }
}));

function save(data, callback){
    var user = new User(data);

    user.save(function(err){
        callback(err, user);
    });
}

function find(conditions, callback){
    return User.find(conditions, function(err, docs){
        callback(err, docs);
    });
}

function findOne(conditions, callback){
    return User.findOne(conditions, function(err, docs){
        callback(err, docs);
    });
}

function update(conditions, updateObj, callback){
    User.update(conditions, updateObj, function(err, docs){
        callback(err, docs);
    });
}

function remove(conditions, callback){
    User.remove(conditions,function(err){
        callback(err);
    });
}

module.exports = {
    update: update,
    save: save,
    find: find,
    findOne: findOne,
    remove: remove
};


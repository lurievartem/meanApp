var mongoose = require('mongoose');
var Schema = mongoose.Schema;

Room = mongoose.model('Rooms', new Schema({
    roomName: { type: String, required: true, unique: true },
    messages: [{
        userName: String,
        date: { type: Date, default: Date.now },
        msg: String
    }]
}));

function createRoom(name, callback){
    var room = new Room({roomName: name});

    room.save(function(err, room){
        callback(err, room);
    });
}

function getRoomsName(callback){
    Room.find({}).select({ "roomName": 1, "_id": 0}).exec(callback);
}

function getRoom(name, callback, create){
    var arg = arguments;

    Room.findOne({roomName : name}, function(err, doc){
        if(!doc && create){
            createRoom(name, function(err, room){
                callback(err, room);
            });
        } else{
            callback(err, doc);
        }
    });
}

function saveMessagesByRoomName(roomName, userName, msg, callback){
    if(!roomName) return;

    getRoom(roomName, function(err, room){
        if(err) throw err;
        saveMessages(room, userName, msg, callback);
    }, true);
}

function saveMessages(room, userName, msg, callback){
    if(!room) return;

    room.messages.push({ userName: userName, msg: msg });
    room.save(callback);
}

function getRoomMessages(roomName, callback){
    if(!roomName) return;

    getRoom(roomName, function(err, room){
        if(err) throw err;
        callback(null, room.messages);
    }, true);
}

module.exports = {
    createRoom: createRoom,
    getRoom: getRoom,
    getRoomsName: getRoomsName,
    saveMessages: saveMessages,
    saveMessagesByRoomName: saveMessagesByRoomName,
    getRoomMessages: getRoomMessages
};
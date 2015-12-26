module.exports = function(io){
    var chat = io.of('/chat');
    var db   = require('../models/chat-model');

    chat.on('connection', function(socket){
        var roomModel;
        var userName;
        var roomName;

        function addMsg(data, callback){
            socket.broadcast.to(roomName).emit('add data', data);
            callback(data);
        }

        function leaveRoom(){
            socket.broadcast.to(roomName).emit('leave room', userName);
            socket.leave(roomName);
        }

        socket.on('join room', function(data, callback){
            userName = data.userName;
            roomName = data.roomName;

            db.getRoom(roomName, function(err, room){
                if(err) throw err;

                if(room){
                    roomModel = room;
                    socket.join(roomName);
                    socket.broadcast.to(roomName).emit('join room', userName);

                    callback(roomName);
                }
            }, true);
        });

        socket.on('add data', function(msg, callback){
            if(roomModel){
                db.saveMessages(roomModel, userName, msg, function(err, data){
                    if(err) throw err;
                    addMsg(data.messages[data.messages.length-1], callback);
                 });
            } else{
                db.saveMessagesByRoomName(roomName, userName, msg, function(err){
                    if(err) throw err;
                    addMsg(data.messages[data.messages.length-1], callback);
                });
            }
        });

        socket.on('leave room', function(text, callback){
            leaveRoom();
            callback();
        });

        socket.on('disconnect', function(){
            leaveRoom();
            socket.broadcast.emit('user disconnect');
        });
    });
};

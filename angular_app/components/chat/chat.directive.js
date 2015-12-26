angular
    .module('nodeSample.chat')
    /* @ngInject*/
    .controller('ChatController', function($sessionStorage, socketFactory, chatFactory){
        var v_this = this;
        this.defaultRoomName = 'default';
        this.roomName;
        this.rooms = [];
        this.messages = [];

        chatFactory.getRooms().then(function(data){
            this.rooms = data;
            setRoom(data && data[0].roomName);
        }.bind(this)).catch(function(err){
            console.log(err); //todo some appropiate action
        });

        this.changeRoom = function(newRoomName){
            socketFactory.emit('leave room', '', function(){
                setRoom(newRoomName);
            });
        };

        this.send = function(){
            socketFactory.emit('add data', v_this.msg, function(data){
                v_this.msg = '';
                v_this.messages.push(data);
            });
        };

         this.getRoomMessage = function(){
            chatFactory.getMessages(v_this.roomName).then(function(data){
                v_this.messages = data;
            }).catch(function(err){
                console.log(err); //todo some appropiate action
            });
        }

        function setRoom(newRoomName){
            var newRoomName = newRoomName || v_this.defaultRoomName;
            socketFactory.emit('join room', { roomName: newRoomName, userName: $sessionStorage.userName }, function(newRoomName){
                v_this.roomName = newRoomName;
                v_this.getRoomMessage();
            });
        }

        socketFactory.on('add data', function(data){
            v_this.messages.push(data);
        });

        socketFactory.on('join room', function(userName){
            //todo
        });

        socketFactory.on('leave room', function(userName){
            //todo
        });

    })
    .directive('chatBlock', function(){
        return {
            restrict: 'EA',
            scope:{
            },
            controller: 'ChatController',
            controllerAs: 'chat',
            bindToController: true,
            templateUrl: '../components/chat/chat.template.html'
        };
    });
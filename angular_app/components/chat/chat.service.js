angular
    .module('nodeSample.chat')
    /* @ngInject*/
    .factory('chatFactory', function($resource){
        var chat = $resource("http://localhost:8000/:data",
            { data: '@data'}, {
            read : { method: 'POST', isArray: true}
        });

        return {
            getMessages: function(roomName){
                return chat.read({ data: 'messages' }, { roomName: roomName}).$promise;
            },
            getRooms: function(){
                return chat.query({ data: 'rooms' }).$promise;
            }
        };
    });
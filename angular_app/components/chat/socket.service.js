angular
    .module('nodeSample.chat')
    /* @ngInject*/
    .factory('socketFactory', function($rootScope){
        var socket = io.connect("http://localhost:8000/chat", {'forceNew':true }); //TODO take data from config

        return{
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
            },
            removeAllListeners: function(eventName, callback){
                socket.removeAllListeners(eventName, function(){
                    $rootScope.$apply(function(){
                        callback.call(socket);
                    });
                });
            }
        };
    });
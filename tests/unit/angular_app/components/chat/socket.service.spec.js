describe('socketFactory', function(){

    var socketFactory,
        socket = {
            on: function(){},
            emit: function(){},
            removeAllListeners: function(){}
        };

    beforeEach(module('nodeSample.chat', function(){
        spyOn(window.io, 'connect').and.callFake(function(){ return socket; });
    }));
    beforeEach(inject(function(_socketFactory_, $rootScope){
        socketFactory = _socketFactory_;
        spyOn(socket, 'on').and.callThrough();
        spyOn(socket, 'emit').and.callThrough();
        spyOn(socket, 'removeAllListeners').and.callThrough();
    }));

    it('should call socket on function', function(){
        socketFactory.on('on', function(){});
        expect(socket.on).toHaveBeenCalledWith('on', jasmine.any(Function));
    });

    it('should call socket emit function', function(){
        socketFactory.emit('emit', 'data' ,function(){});
        expect(socket.emit).toHaveBeenCalledWith('emit', 'data', jasmine.any(Function));
    });

    it('should call socket removeAllListeners function', function(){
        socketFactory.removeAllListeners('removeAllListeners', function(){});
        expect(socket.removeAllListeners).toHaveBeenCalledWith('removeAllListeners', jasmine.any(Function));
    });

});
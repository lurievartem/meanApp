describe('chat block directive', function(){

    beforeEach(module('NodeSample'));

    describe('save user', function(){
        var $controller,
            chatFactory;

        beforeEach(module(function($provide){
            $provide.value('chatFactory', {
                getRooms: function(){
                    return{
                        then: function(){ return this; },
                        catch: function(){ return this; }
                    }
                },
                getMessages: function(){
                   return{
                       then: function(){ return this; },
                       catch: function(){ return this; }
                   }
                }
            });
        }));

        beforeEach(inject(function(_$controller_, $rootScope, _chatFactory_){
            chatFactory = _chatFactory_;
            spyOn(chatFactory, 'getRooms').and.callThrough();
            spyOn(chatFactory, 'getMessages').and.callThrough();
            $controller = _$controller_('ChatController', {$scope: $rootScope.$new() });
        }));

        it("should get rooms when init controller", function(){
            expect(chatFactory.getRooms).toHaveBeenCalled();
        });

        it("should get messages when call getRoomMessage", function(){
            $controller.getRoomMessage();
            expect(chatFactory.getMessages).toHaveBeenCalled();
        });

    });

    describe('controller actions', function(){
        var $controller,
            socketFactory;

        beforeEach(module(function($provide){
            $provide.value('socketFactory', {
                emit: function(eventName){
                    return eventName;
                },
                on: function(eventName, callback){
                    callback();
                    return eventName;
                }
            });
        }));

        beforeEach(inject(function(_$controller_, $rootScope, _socketFactory_){
            socketFactory = _socketFactory_;
            spyOn(socketFactory, 'emit').and.callThrough();
            spyOn(socketFactory, 'on').and.callThrough();
            $controller = _$controller_('ChatController', {$scope: $rootScope.$new() }, { fileEndLoading: true, user: {}});
        }));

        it('should emit socket event leave room', function(){
            $controller.changeRoom();
            expect(socketFactory.emit).toHaveBeenCalledWith('leave room', '', jasmine.any(Function));
        });

        it('should emit socket event add data', function(){;
            $controller.msg = 'mess';
            $controller.send();
            expect(socketFactory.emit).toHaveBeenCalledWith('add data', 'mess',  jasmine.any(Function));
        });

        it('should on socket join room when init controller', function(){
            expect(socketFactory.on).toHaveBeenCalledWith('join room', jasmine.any(Function));
        });

        it('should on socket leave room when init controller', function(){
            expect(socketFactory.on).toHaveBeenCalledWith('leave room', jasmine.any(Function));
        });
    })
});

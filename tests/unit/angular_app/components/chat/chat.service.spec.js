describe('chatFactory', function(){
    var httpBackend,
        chatFactory,
        url = 'http://localhost:8000/';

    beforeEach(module('NodeSample'));

    beforeEach(inject(function(_chatFactory_, $httpBackend, $templateCache){
        $templateCache.put('../views/home.html', '');
        httpBackend = $httpBackend;
        chatFactory = _chatFactory_;
    }));

    afterEach(function(){
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

     it('should get messages', function(){
         httpBackend.whenPOST(url + 'messages').respond([{success: true}]);
         chatFactory.getMessages().then(function(result){
             expect(result.length).toBe(1);
         });
         httpBackend.flush();
     });

     it('should get rooms', function(){
         httpBackend.whenGET(url + 'rooms').respond([{success: true}]);
         chatFactory.getRooms().then(function(result){
             expect(result.length).toBe(1);
         });
         httpBackend.flush();
     });
});
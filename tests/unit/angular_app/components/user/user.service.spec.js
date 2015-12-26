describe('UserFactory', function(){

    var $httpBackend,
        UserFactory,
        url = 'http://localhost:8000/user/';

    beforeEach(module('NodeSample'));

    beforeEach(inject(function($httpBackend, _UserFactory_, $templateCache){
        httpBackend = $httpBackend;
        UserFactory = _UserFactory_;
        $templateCache.put('../views/home.html', '');
        httpBackend.whenGET(url + 'get').respond({ data: 'data' });
    }));

    afterEach(function(){
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should return data on receive', function(){
        UserFactory.getUser().then(function(result){
            expect(result.data).toBe('data');
        });
        httpBackend.flush();
    });

});
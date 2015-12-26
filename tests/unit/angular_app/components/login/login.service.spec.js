describe('LoginFactory', function(){

    var $httpBackend,
        LoginFactory,
        url = 'http://localhost:8000/auth';

    beforeEach(module('NodeSample'));

    beforeEach(inject(function($httpBackend, _LoginFactory_, $templateCache){
        httpBackend = $httpBackend;
        LoginFactory = _LoginFactory_
        $templateCache.put('../views/home.html', '');
        httpBackend.whenPOST(url).respond({ success: true });
    }));

    afterEach(function(){
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should return success login', function(){
        LoginFactory.checkLogin().then(function(result){
            expect(result.success).toBe(true);
        });
        httpBackend.flush();
    });

});


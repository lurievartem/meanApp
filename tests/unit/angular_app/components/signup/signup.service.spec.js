describe('SignupUserFactory', function(){

    var $httpBackend,
        SignupUserFactory,
        url = 'http://localhost:8000/user/';

    beforeEach(module('NodeSample'));

    beforeEach(inject(function($httpBackend, _SignupUserFactory_, $templateCache){
        $templateCache.put('../views/home.html', '');
        httpBackend = $httpBackend;
        SignupUserFactory = _SignupUserFactory_;
    }));

    afterEach(function(){
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should success add new user', function(){
        httpBackend.whenPOST(url + 'save').respond({ success: true });
        SignupUserFactory.saveUser().then(function(result){
            expect(result.success).toBe(true);
        });
        httpBackend.flush();
    });

    it('should check email', function(){
        httpBackend.whenGET(url + 'email').respond({ success: true });
        SignupUserFactory.emailAvailable().then(function(result){
            expect(result.success).toBe(true);
        });
        httpBackend.flush();
    });

});
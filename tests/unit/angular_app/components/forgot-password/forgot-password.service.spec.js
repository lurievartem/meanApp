describe('SendFactory', function(){

    var httpBackend,
        SendFactory,
        url = 'http://localhost:8000/auth/';

    beforeEach(module('NodeSample'));
    beforeEach(inject(function($httpBackend, _SendFactory_, $templateCache){
        $templateCache.put('../views/home.html', '');
        httpBackend = $httpBackend;
        SendFactory = _SendFactory_;
    }));

    afterEach(function(){
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should call change password', function(){
        httpBackend.whenPOST(url + 'change-password').respond({ success: true });
        SendFactory.changePassword().then(function(result){
            expect(result.success).toBe(true);
        });
        httpBackend.flush();
    });

    it('should call forgot password', function(){
        httpBackend.whenPOST(url + 'forgot-password').respond({ success: true });
        SendFactory.forgotPassword().then(function(result){
            expect(result.success).toBe(true);
        });
        httpBackend.flush();
    });
});
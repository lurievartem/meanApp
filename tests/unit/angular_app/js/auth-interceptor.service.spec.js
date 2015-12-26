describe('auth interceptor', function(){

    var authInterceptor,
        $window;

    beforeEach(module('NodeSample'));
    beforeEach(inject(function(_authInterceptor_){
        authInterceptor = _authInterceptor_;
    }));

    it('should be defined', function(){
        expect(authInterceptor).toBeDefined();
    });

    describe('response HTTP 401', function(){
        var $state,
            $rootScope;

        beforeEach(inject(function(_$state_, _$rootScope_, $templateCache){
            $state = _$state_;
            $rootScope = _$rootScope_;
            $templateCache.put('../views/home.html', '');
            $templateCache.put('../views/login.html', '');
        }));

        it('should redirect to login page', function(){
            authInterceptor.responseError({ status: 401 });
            $rootScope.$digest();
            expect($state.current.name).toBe('home.login');
        });
    });

    describe('response HTTP 200', function(){
        var $sessionStorage,
            response,
            token,
            name;

        beforeEach(inject(function(_$sessionStorage_){
            token = "tokens";
            name = "name";
            $sessionStorage = _$sessionStorage_;
        }));

        it('should set token and name', function(){
            authInterceptor.response({data:{success: true, token: token, name: name}});
            expect($sessionStorage.token).toBe(token);
            expect($sessionStorage.userName).toBe(name);
        });

        it('should not set token and name', function(){
            authInterceptor.response({data:{success: false}});
            expect($sessionStorage.token).toBeUndefined();
            expect($sessionStorage.userName).toBeUndefined();
        });
    });

    describe('redirect', function(){
        var $sessionStorage,
            token;

        beforeEach(inject(function(_$sessionStorage_){
            token = "tokens";
            $sessionStorage = _$sessionStorage_;
            $sessionStorage.token = token;
        }));

        it('should set token', function(){
            headers = authInterceptor.request({}).headers;
            expect(headers['x-access-token']).toBe(token);
        });
    });
});


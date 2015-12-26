describe('Unit: NodeSample', function(){

    beforeEach(module('NodeSample'));
    beforeEach(module('ui.router'));

    describe('config phase', function(){
        var $state,
            $sessionStorage,
            $rootScope,
            $location,
            state;

        beforeEach(inject(function(_$state_, _$rootScope_, _$sessionStorage_){
            $state = _$state_;
            $rootScope = _$rootScope_;
            $sessionStorage = _$sessionStorage_;
            $sessionStorage.token = 'session';
        }));

        function goToState(){
            $state.go(state);
            $rootScope.$digest();
        }

        function goToUrl(url){
            $location.url(url);
            $rootScope.$digest();
        }

        describe('home route', function(){
            beforeEach(inject(function($templateCache){
                state = 'home';
                $templateCache.put('../views/home.html', '');
            }));

            it('should respond to URL', function(){
                expect($state.href(state)).toEqual('/');
            });

            it('should activate the state', function(){
                goToState();
                expect($state.current.name).toBe(state);
            });
        });

        describe('main route', function(){
            beforeEach(inject(function($templateCache){
                state = 'main';
                $templateCache.put('../views/main.html', '');
            }));

            it('should respond to URL', function(){
                expect($state.href(state)).toEqual('/main');
            });

            it('should activate the state', function(){
                goToState();
                expect($state.current.name).toBe(state);
                expect($state.current.data.requireLogin).toBe(true);
            });
        });

        describe('chat route', function(){
            beforeEach(inject(function($templateCache){
                state = 'chat';
                $templateCache.put('../views/chat.html', '');
            }));

            it('should respond to URL', function(){
                expect($state.href(state)).toEqual('/chat');
            });

            it('should activate the state', function(){
                goToState();
                expect($state.current.name).toBe(state);
                expect($state.current.data.requireLogin).toBe(true);
            });
        });

        describe('user route', function(){
            beforeEach(inject(function($templateCache){
                state = 'user';
                $templateCache.put('../views/user.html', '');
            }));

            it('should respond to URL', function(){
                expect($state.href(state)).toEqual('/user');
            });

            it('should activate the state', function(){
                goToState();
                expect($state.current.name).toBe(state);
                expect($state.current.data.requireLogin).toBe(true);
            });
        });

        describe('profile route', function(){
            beforeEach(inject(function($templateCache, _$location_){
                $location = _$location_;
                $templateCache.put('../views/main.html', '');
            }));

            it('should redirect to the state', function(){
                var token = "tokens";
                var name = "names";
                goToUrl("/profile?access_token=" + token + "&name=" + name);
                expect($state.current.name).toBe('main');
                expect($sessionStorage.token).toBe(token);
                expect($sessionStorage.name).toBe(name);
            });
        });

        describe('404 route', function(){
            beforeEach(inject(function($templateCache){
                state = '404';
                $templateCache.put('../views/404.html', '');
            }));

            it('should respond to URL', function(){
                expect($state.href(state)).toEqual('/404');
            });

            it('should activate the state', function(){
                goToState();
                expect($state.current.name).toBe(state);
            });
        });

        describe('otherwise route', function () {
            var url = 'someNonExistentUrl';
            beforeEach(inject(function($templateCache, _$location_){
                $location = _$location_;
                $templateCache.put('../views/404.html', '');
            }));

            it('should go to the 404 state', function () {
                goToUrl(url);
                expect($state.current.name).toEqual('404');
            });

        });

        describe('home.login route', function(){
            beforeEach(inject(function($templateCache){
                state = 'home.login';
                $templateCache.put('../views/home.html', '');
                $templateCache.put('../views/login.html', '');
            }));

            it('should respond to URL', function(){
                expect($state.href(state)).toEqual('/auth/login');
            });

            it('should activate the state', function(){
                goToState();
                expect($state.current.name).toBe(state);
                expect($state.current.data.redirectSuccess).toBe("main");
                expect($state.current.data.redirectClose).toBe("home");
                expect($state.current.data.forgot).toBe("^.forgot_password");
            });
        });

        describe('home.forgot_password', function(){
            beforeEach(inject(function($templateCache){
                state = 'home.forgot_password';
                $templateCache.put('../views/home.html', '');
                $templateCache.put('../views/forgot-password.html', '');
            }));

            it('should respond to URL', function(){
                expect($state.href(state)).toEqual('/auth/forgot');
            });

            it('should activate the state', function(){
                goToState();
                expect($state.current.name).toBe(state);
                expect($state.current.data.redirectSuccess).toBe("home");
                expect($state.current.data.redirectClose).toBe("home");
            });
        });

        describe('home.change_password', function(){
            beforeEach(inject(function($templateCache){
                state = 'home.change_password';
                $templateCache.put('../views/home.html', '');
                $templateCache.put('../views/change-password.html', '');
            }));

            it('should respond to URL', function(){
                expect($state.href(state)).toEqual('/auth/change');
            });

            it('should activate the state', function(){
                goToState();
                expect($state.current.name).toBe(state);
                expect($state.current.data.redirectSuccess).toBe("home.login");
                expect($state.current.data.redirectClose).toBe("^");
            });
        });

        describe('home.sign', function(){
            beforeEach(inject(function($templateCache){
                state = 'home.sign';
                $templateCache.put('../views/home.html', '');
                $templateCache.put('../views/sign.html', '');
            }));

            it('should respond to URL', function(){
                expect($state.href(state)).toEqual('/auth/sign');
            });

            it('should activate the state', function(){
                goToState();
                expect($state.current.name).toBe(state);
                expect($state.current.data.redirectSuccess).toBe("main");
                expect($state.current.data.redirectClose).toBe("home");
            });
        });

    });

    describe('run phase', function(){
        var $state,
            $sessionStorage,
            $rootScope,
            $templateCache;

        beforeEach(inject(function(_$state_, _$rootScope_, _$sessionStorage_, _$templateCache_){
            $state = _$state_;
            $rootScope = _$rootScope_;
            $sessionStorage = _$sessionStorage_;
            $templateCache = _$templateCache_;
        }));

        it('should redirect on login when session is undefined', function(){
            $templateCache.put('../views/home.html', '');
            $templateCache.put('../views/login.html', '');
            $rootScope.$broadcast('$stateChangeStart', { name: 'main', data: { requireLogin: true } }, {}, {}, {} );
            $rootScope.$digest();
            expect($state.current.name).toBe('home.login');
        });

        it('should redirect on caller state when data = {}', function(){
            $templateCache.put('../views/home.html', '');
            $templateCache.put('../views/login.html', '');
            $state.go('home.login');
            $rootScope.$digest();
            expect($state.current.name).toBe('home.login');
        });

        it('should redirect on caller state when session is not undefined', function(){
            $templateCache.put('../views/main.html', '');
            $sessionStorage.token = 'session';
            $state.go('main');
            $rootScope.$digest();
            expect($state.current.name).toBe('main');
        });
    });

});
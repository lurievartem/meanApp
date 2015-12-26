describe('login block directive', function(){

    beforeEach(module('NodeSample'));

    describe('check login', function(){
        var $controller,
            LoginFactory;

        beforeEach(module(function($provide){
            $provide.value('LoginFactory', {
                checkLogin: function(){
                    return{
                        then: function(){ return this; },
                        catch: function(){ return this; }
                    }
                }
            });
        }));

        beforeEach(inject(function(_$controller_, $rootScope, _LoginFactory_){
            LoginFactory = _LoginFactory_;
            spyOn(LoginFactory, 'checkLogin').and.callThrough();
            $controller = _$controller_('LoginBlockController', {$scope: $rootScope.$new() }, {userForm: { $valid: true}});
        }));

        it("shouldn't check login when userForm.$valid=false", function(){
            $controller.userForm.$valid = false;
            $controller.checkLogin();
            expect(LoginFactory.checkLogin).not.toHaveBeenCalled();
        });

        it('should check login', function(){
            $controller.checkLogin();
            expect($controller.submitted).toBe(true);
            expect(LoginFactory.checkLogin).toHaveBeenCalled();
        });

    });

    describe('controller actions', function(){
        var $controller,
            $state;

        beforeEach(module('ui.router'));
        beforeEach(inject(function(_$controller_, $rootScope, _$state_){
            $state = _$state_;
            spyOn($state, 'go');
            $controller = _$controller_('LoginBlockController', {$scope: $rootScope.$new() }, { fileEndLoading: true, user: {}});
        }));

        it('should redirect when call forgot', function(){
            $state.current = { data : { forgot: 'forgot' } };
            $controller.forgot();
            expect($state.go).toHaveBeenCalled();
        });
    });
});
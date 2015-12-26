describe('signup block directive', function(){

    beforeEach(module('NodeSample'));

    describe('save user', function(){
        var $controller,
            SignupUserFactory;

        beforeEach(module(function($provide){
            $provide.value('SignupUserFactory', {
                saveUser: function(){
                    return{
                        then: function(){ return this; },
                        catch: function(){ return this; }
                    }
                }
            });
        }));

        beforeEach(inject(function(_$controller_, $rootScope, _SignupUserFactory_){
            SignupUserFactory = _SignupUserFactory_;
            spyOn(SignupUserFactory, 'saveUser').and.callThrough();
            $controller = _$controller_('SignUpBlockController', {$scope: $rootScope.$new() }, {userForm: { $valid: true}, fileEndLoading: true, user: {}});
        }));

        it("shouldn't save user when fileEndLoading=false", function(){
            $controller.fileEndLoading = false;
            $controller.saveUser();
            expect(SignupUserFactory.saveUser).not.toHaveBeenCalled();
        });

        it("shouldn't save user when userForm.$valid=false", function(){
            $controller.userForm.$valid = false;
            $controller.saveUser();
            expect(SignupUserFactory.saveUser).not.toHaveBeenCalled();
        });

        it('should save user', function(){
            $controller.saveUser();
            expect($controller.submitted).toBe(true);
            expect(SignupUserFactory.saveUser).toHaveBeenCalled();
        });

    });

    describe('controller actions', function(){
        var $controller;

        beforeEach(inject(function(_$controller_, $rootScope){
            $controller = _$controller_('SignUpBlockController', {$scope: $rootScope.$new() }, { fileEndLoading: true, user: {}});
        }));

        it('should set user logo', function(){
            $controller.download(1);
            expect($controller.user.logo).toBe(1);
        });

        it('should set fileEndLoading in false', function(){;
            $controller.fileStartLoad();
            expect($controller.fileEndLoading).toBe(false);
        });

        it('should set fileEndLoading in true', function(){
            $controller.fileEndLoad();
            expect($controller.fileEndLoading).toBe(true);
        });
    })
});

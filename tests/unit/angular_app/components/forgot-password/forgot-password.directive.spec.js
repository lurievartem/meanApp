describe('change password directive', function(){

    beforeEach(module('NodeSample'));

    describe('change password', function(){
        var $controller,
            SendFactory;

        beforeEach(module(function($provide){
            $provide.value('SendFactory', {
                forgotPassword: function(){
                    return{
                        then: function(){ return this; },
                        catch: function(){ return this; }
                    }
                }
            });
        }));

        beforeEach(inject(function(_$controller_, $rootScope, _SendFactory_){
            SendFactory = _SendFactory_;
            spyOn(SendFactory, 'forgotPassword').and.callThrough();
            $controller = _$controller_('ForgotPasswordController', {$scope: $rootScope.$new() }, {userForm: { $valid: true}});
        }));

        it("shouldn't change password when userForm.$valid=false", function(){
            $controller.userForm.$valid = false;
            $controller.forgotPassword();
            expect(SendFactory.forgotPassword).not.toHaveBeenCalled();
        });

        it('should change password', function(){
            $controller.forgotPassword();
            expect($controller.submitted).toBe(true);
            expect(SendFactory.forgotPassword).toHaveBeenCalled();
        });

    });

});
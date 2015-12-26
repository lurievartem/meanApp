describe('change password directive', function(){

    beforeEach(module('NodeSample'));

    describe('change password', function(){
        var $controller,
            SendFactory;

        beforeEach(module(function($provide){
            $provide.value('SendFactory', {
                changePassword: function(){
                    return{
                        then: function(){ return this; },
                        catch: function(){ return this; }
                    }
                }
            });
        }));

        beforeEach(inject(function(_$controller_, $rootScope, _SendFactory_){
            SendFactory = _SendFactory_;
            spyOn(SendFactory, 'changePassword').and.callThrough();
            $controller = _$controller_('ChangePasswordController', {$scope: $rootScope.$new() }, {userForm: { $valid: true}});
        }));

        it("shouldn't change password when userForm.$valid=false", function(){
            $controller.userForm.$valid = false;
            $controller.changePassword();
            expect(SendFactory.changePassword).not.toHaveBeenCalled();
        });

        it('should change password', function(){
            $controller.changePassword();
            expect($controller.submitted).toBe(true);
            expect(SendFactory.changePassword).toHaveBeenCalled();
        });

    });

});
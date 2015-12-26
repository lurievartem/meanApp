describe('userBlock directive', function(){
    var $controller,
        $scope,
        UserFactory;

    beforeEach(module('NodeSample'));
    beforeEach(module(function($provide){
        $provide.value('UserFactory', {
            getUser: function(){
                return{
                    then: function(){ return this; },
                    catch: function(){ return this; }
                }
            }
        });
    }));
    beforeEach(inject(function($controller, $rootScope ,_UserFactory_){
        $scope = $rootScope.$new();
        UserFactory = _UserFactory_;
        spyOn(UserFactory, 'getUser').and.callThrough();

        createController = function(){
            return $controller('UserBlockController', {
                $scope: $scope,
                $stateParams: {}
            });
        };
    }));

    it('should call the user factory to retrieve user', function(){
        createController();
        expect(UserFactory.getUser).toHaveBeenCalled();
    });
});

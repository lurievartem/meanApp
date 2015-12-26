describe('compare-to directive', function(){

    var scope;

    beforeEach(module('compareTo'));
    beforeEach(inject(function($compile, $rootScope){
        scope = $rootScope.$new();
        scope.model = { password: '', confirmPassword: 'password' };
        var element = $compile('<form name="form">' +
                                    '<input ng-model="model.password" type="text" name="password" id="password">' +
                                    '<input compare-to="model.password" ng-model="model.confirmPassword" type="text" name="confirmPassword" id="confirmPassword">' +
                                '</form>'
        )(scope);
    }));

    it('should return error when 2 values not equal', function(){
        scope.$digest();
        expect(scope.form.confirmPassword.$error.compareTo).toEqual(true);
    });

    it("shouldn't return when 2 values equal", function(){
        scope.model.password = 'password';
        scope.$digest();
        expect(scope.form.confirmPassword.$error.compareTo).toBe(undefined);
    });

});
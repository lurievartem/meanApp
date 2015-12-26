module.exports = function(SignupUserFactory){
    return{
        require: "ngModel",
        link: function($scope, element, attrs, ngModel){
            ngModel.$asyncValidators.emailAvailable = function(email){
                return SignupUserFactory.emailAvailable(email);
            };
        }
    }
};
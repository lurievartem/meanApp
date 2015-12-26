angular
    .module("nodeSample.signup")
    /* @ngInject*/
    .factory('SignupUserFactory', function($resource){
        var res = $resource("http://localhost:8000/user/:path", {path: "@path"});

        return {
            saveUser: function (data){
                return res.save({ path: 'save' }, data).$promise;
            },
            emailAvailable: function(email){
                return res.get({path: 'email'}, { email: email }).$promise;
            }
        }
    });

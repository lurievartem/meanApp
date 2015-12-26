angular
    .module("nodeSample.login")
    /* @ngInject*/
    .factory('LoginFactory', function($resource){
        var res = $resource("http://localhost:8000/auth/", {}, {
            check: { method: 'POST'}
        });

        return{
            checkLogin: function(data){
                return res.check(data).$promise;
            }
        };
    });
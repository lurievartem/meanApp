angular
    .module("nodeSample.user")
    /* @ngInject*/
    .factory('UserFactory', function($resource){
        var res = $resource("http://localhost:8000/user/:path", { path: '@path' });

        return{
            getUser: function(){
                return res.get({ path: 'get' }).$promise;
            }
        };
    });
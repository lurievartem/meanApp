angular
    .module("NodeSample")
    /* @ngInject*/
    .factory('authInterceptor', function($sessionStorage, $injector, $q){
         return{
             request: function(req){
                 req.headers = req.headers || {};
                 if($sessionStorage.token){
                     req.headers['x-access-token'] = $sessionStorage.token;
                 }
                 return req;
             },
             response: function(res){
                if(res && res.data && res.data.success){
                    $sessionStorage.token = res.data.token;
                    $sessionStorage.userName = res.data.name;
                }
                return res;
             },
             responseError: function(res){
                 if(res.status == 401){
                     $injector.get("$state").go("home.login");
                 }

                 return res || $q.when(res);
             }
         };
    });
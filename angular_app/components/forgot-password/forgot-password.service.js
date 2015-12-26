angular
    .module("nodeSample.forgotPassword")
    /* @ngInject*/
    .factory("SendFactory", function($resource){
        var res = $resource("http://localhost:8000/auth/:path", {path: "@path"}, {
            send: { method: 'POST' }
        });

        return {
            changePassword: function(pass, token){
                return res.send({ path: "change-password" }, { password: pass, token: token}).$promise;
            },
            forgotPassword: function(email){
                return res.send({ path: "forgot-password" }, { email: email }).$promise;
            }
        };
    });
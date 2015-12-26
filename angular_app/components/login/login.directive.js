angular
    .module("nodeSample.login")
    /* @ngInject*/
    .controller('LoginBlockController', function($state, LoginFactory){
        this.data = {};
        this.checkLogin = function(){
            this.submitted = true;
            if(this.userForm.$valid){
                LoginFactory.checkLogin(this.data).then(function(data){
                    if(data && data.success){
                        $state.go($state.current.data.redirectSuccess);
                    }
                }.bind(this)).catch(function(err){
                    console.log(err);
                    //TODO show some dialog with error
                });
            }
        };

        this.forgot = function(){
            $state.go($state.current.data.forgot);
        }
    })
    .directive('loginBlock', function() {
        return {
            restrict: 'EA',
            scope: {
            },
            controller: 'LoginBlockController',
            controllerAs: 'login',
            bindToController: true,
            templateUrl: '../components/login/login.template.html'
        };
    });

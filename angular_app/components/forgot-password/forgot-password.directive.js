angular
    .module("nodeSample.forgotPassword")
    /* @ngInject*/
    .controller("ForgotPasswordController", function($state, SendFactory){
        this.forgotPassword = function(){
            this.submitted = true;
            if(this.userForm.$valid){
                SendFactory.forgotPassword(this.email).then(function(data){
                    if(data && data.success){
                        $state.go($state.current.data.redirectSuccess);
                    }
                }).catch(function(data){
                    console.log(data);
                    //todo do something
                });
            }
        };
    })
    .directive("forgotPassword", function(){
        return {
            restrict: 'EA',
            scope:{
            },
            controller: "ForgotPasswordController",
            controllerAs: "forgot",
            bindToController: true,
            templateUrl: '../components/forgot-password/forgot-password.template.html'
        };
    });
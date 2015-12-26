angular
    .module("nodeSample.forgotPassword")
    /* @ngInject*/
    .controller("ChangePasswordController", function($state, SendFactory){
        this.changePassword = function(){
            this.submitted = true;
            if(this.userForm.$valid){
                SendFactory.changePassword(this.password, $state.params.hash).then(function(data){
                    if(data && data.success){
                        $state.go($state.current.data.redirectSuccess);
                    }
                }).catch(function(data){
                    //todo do something
                });
            }
        };
    })
    .directive("changePassword", function(){
        return {
            restrict: 'EA',
            scope:{
            },
            controller: "ChangePasswordController",
            controllerAs: "change",
            bindToController: true,
            templateUrl: '../components/forgot-password/change-password.template.html'
        };
    });
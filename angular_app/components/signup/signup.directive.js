angular
    .module("nodeSample.signup")
    /* @ngInject*/
    .controller('SignUpBlockController', function($state, SignupUserFactory){
        this.user = {};
        this.fileEndLoading = true;

        this.saveUser = function(){
            this.submitted = true;
            if(this.userForm.$valid && this.fileEndLoading){
                SignupUserFactory.saveUser(this.user).then(function(data){
                    if(data && data.success){
                        $state.go($state.current.data.redirectSuccess);
                    }
                }.bind(this)).catch(function(err){
                    console.log(err);
                    //TODO show some dialog with error
                });
            }
        };

        //file loading
        this.download = function(file){
            this.user.logo = file;
        };

        this.fileStartLoad = function(){
            this.fileEndLoading = false;
        };

        this.fileEndLoad = function(){
            this.fileEndLoading = true;
        };
    })
    .directive('signupBlock', function() {
        return {
            restrict: 'EA',
            scope: {
            },
            controller: 'SignUpBlockController',
            controllerAs: 'signup',
            bindToController: true,
            templateUrl: '../components/signup/signup.template.html'
        };
    });

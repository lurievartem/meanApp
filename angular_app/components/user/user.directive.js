angular
    .module("nodeSample.user")
    /* @ngInject*/
    .controller('UserBlockController', function(UserFactory){
        UserFactory.getUser().then(function(data){
            this.data = data;
        }.bind(this)).catch(function(err){
            console.log(err);
            //TODO show some dialog with error
        });
    })
    .directive('userBlock', function() {
        return {
            restrict: 'EA',
            scope: {
            },
            controller: 'UserBlockController',
            controllerAs: 'user',
            bindToController: true,
            templateUrl: '../components/user/user.template.html'
        };
    });

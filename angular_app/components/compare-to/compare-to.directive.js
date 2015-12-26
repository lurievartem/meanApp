angular
    .module("compareTo")
    .directive("compareTo", function(){
        return {
            restrict: "A",
            require: "ngModel",
            scope: {
                compareValue: "=compareTo"
            },
            link: function($scope, element, attrs, ngModel){
                ngModel.$validators.compareTo = function(value){
                    return value == $scope.compareValue;
                }

                $scope.$watch("compareValue", function(){
                    ngModel.$validate();
                });
            }
        };
    });
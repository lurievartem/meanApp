angular
    .module("NodeSample")
    /* @ngInject*/
    .provider('modalState', function($stateProvider){
        this.provider = this;
        this.$get = function(){
            return provider;
        }
        this.state = function(stateName, options){
            var modalInstance;
            var keepPath;
            $stateProvider.state(stateName, {
                url: options.url,
                templateUrl: options.templateUrl,
                data: options.data,
                onEnter: function($state){
                    setTimeout(function(){
                        keepPath = false;
                        modalInstance = $('.modal');
                        modalInstance.modal();
                        modalInstance.on('hidden.bs.modal', function(){
                            if(!keepPath){
                                $state.go(options.data.redirectClose);
                            }
                        });
                    }, 100);
                },
                onExit: function(){
                    if(modalInstance){
                        keepPath = true;
                        modalInstance.modal('hide');
                        $('.modal-backdrop').remove();
                    }
                }
            });
            return this;
        };
    });
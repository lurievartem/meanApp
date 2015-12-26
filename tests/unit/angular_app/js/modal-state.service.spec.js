describe('modal state service test', function(){
    var modal,
        $state;

    beforeEach(module(function($provide){
        $provide.provider('$state', function(){
            this.state = function(name, params){};
            this.$get = function(){};
        });
    }));

    beforeEach(module("NodeSample"));
    beforeEach(module(function($stateProvider, modalStateProvider){
        $state = $stateProvider;
        modal = modalStateProvider;

        spyOn($state, 'state');
    }));

    beforeEach(inject());

    it('should call $state.state and set right name and params', function(){
        var name = 'name';
        var params = {
            url: 'url',
            templateUrl: 'templateUrl',
            data: 'data'
        };
        modal.state(name, params);
        expect($state.state).toHaveBeenCalled();
        expect($state.state.calls.mostRecent().args[0]).toEqual(name);
        expect($state.state.calls.mostRecent().args[1].url).toEqual(params.url);
        expect($state.state.calls.mostRecent().args[1].templateUrl).toEqual(params.templateUrl);
        expect($state.state.calls.mostRecent().args[1].data).toEqual(params.data);
    });

});

describe('file upload directive', function(){

    beforeEach(module('NodeSample'));
    beforeEach(module('templates'));

    describe('controller', function(){
        var $controller;

        beforeEach(inject(function(_$controller_, $rootScope){
            $controller = _$controller_('FileUploadController', {$scope: $rootScope.$new() }, {files: [], onStart: function(){}});
        }));

        it("should call onStart", function(){
            spyOn($controller, 'onStart')
            $controller.uploadFiles([1,2,3]);
            expect($controller.onStart).toHaveBeenCalled();
        });

        it("should add data to files", function(){
            $controller.uploadFiles([1,2,3]);
            expect($controller.files.length).toBe(3);
        });

    });

    describe('directive', function(){
        var $scope,
            isolateScope,
            element;

        function dispatchEvent(selector, data){
            var el = angular.element(element.children(selector)[0]);
            if(el){
                el.triggerHandler(data);
                $scope.$digest();
            }
        }

        beforeEach(inject(function($compile, $rootScope, $templateCache){
            element = angular.element('<file-upload></file-upload>');
            $scope = $rootScope.$new();
            $compile(element)($scope);
            $scope.$digest();
            isolateScope = element.isolateScope();
            spyOn(isolateScope, 'uploadFiles').and.callFake(function(){ return;});
        }));

        it("should call uploadFiles when drop in #file-drag element", function(){
            debugger
            dispatchEvent('#file-drag', { type: 'drop', dataTransfer : { files: [] } });
            expect(isolateScope.uploadFiles).toHaveBeenCalled();
        });

        it("should call uploadFiles when change in #file-select element", function(){
            dispatchEvent('#file-select', { type: 'change', dataTransfer : { files: [] } });
            expect(isolateScope.uploadFiles).toHaveBeenCalled();
        });

        it("should set dataTransfer.effectAllowed to copy", function(){
            var dataTransfer = {};
            dispatchEvent('#file-drag', { type: 'dragover', dataTransfer: dataTransfer });
            expect(isolateScope.uploadFiles).not.toHaveBeenCalled();
            expect(dataTransfer.effectAllowed).toBe('copy');
        });
    });

});
angular
    .module("nodeSample.fileUpload")
    .controller('FileUploadController',function(){
        var vm = this;
        this.files = [];
        this.fileDownloaded = 0;

        if(!this.validMimeTypes)
            this.validMimeTypes = ['image/png', 'image/jpeg', 'image/gif'];

        function checkFile(file){
            if(file && vm.validMimeTypes){
                return vm.validMimeTypes.indexOf(file.type) > -1;
            }
        }

        function loadFile(file){
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (function(theFile){
                return function(e){
                    var newFile = {
                        name: theFile.name,
                        dataUrl: e.target.result
                    };
                    vm.onDownload({file: newFile});
                    vm.fileDownloaded += 1;

                    if(vm.files.length == vm.fileDownloaded) vm.onEnd();
                };
            })(file);
        }

        this.uploadFiles = function(newFiles){
            this.files = this.files.concat(Array.prototype.slice.call(newFiles));
            this.onStart();

            angular.forEach(this.files, function(file){
                if(checkFile(file)){
                    loadFile(file);
                }
            });
        }
    })
    .directive('fileUpload', function(){
        function link($scope, $element, $attrs, $ctrl){
            var dropZoneElement = angular.element($element.children('#file-drag')[0]);
            var fileSelectElement = angular.element($element.children('#file-select')[0]);

            $scope.uploadFiles = $ctrl.uploadFiles;

            dropZoneElement.on('drop', onLoad);
            dropZoneElement.on('dragover', onDragOver);
            fileSelectElement.on('change', onLoad);

            function onDragOver(e){
                e.preventDefault();
                e.stopPropagation();
                e.dataTransfer.effectAllowed = 'copy';
            }

            function onLoad(e){
                e.preventDefault();
                e.stopPropagation();
                if(e.dataTransfer && e.dataTransfer.files){
                    $scope.uploadFiles(e.dataTransfer.files);
                    $scope.$apply();
                }
            }
        };

        return{
            restrict: 'EA',
            scope: {
                onStart: '&',
                onEnd: '&',
                onDownload: '&',
                validMimeTypes: '@'
            },
            controller: 'FileUploadController',
            controllerAs: 'upload',
            bindToController: true,
            link: link,
            templateUrl: '../components/file-upload/file-upload.template.html'
        };
    });


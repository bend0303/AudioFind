'use strict';

angular.module('audioupload').directive('uploadFile', ['$parse',
	function($parse) {
		return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                console.log('asd');
                var model = $parse(attrs.uploadFile);
                var modelSetter = model.assign;
                console.log(model);

                element.bind('change', function(){
                    scope.$apply(function(){
                        console.log(element);
                        modelSetter(scope, element[0].files[0]);
                    });
                });
			}
		};
	}
]);
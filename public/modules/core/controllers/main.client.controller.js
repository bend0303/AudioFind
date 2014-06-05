'use strict';

angular.module('core').controller('MainController', ['$scope', '$state',
	function($scope, $state) {
        $scope.is = function(name){
            return $state.is(name);
        }
	}
]);
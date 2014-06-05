'use strict';

angular.module('audiosearch').controller('MainsearchController', ['$scope', 'Audiodocs',
	function($scope, Audiodocs) {
        $scope.docresults = {};

        // Find a list of Audiodocs
        $scope.findDoc = function() {
            $scope.audiodocs = Audiodocs.query();
        };

    }
]);
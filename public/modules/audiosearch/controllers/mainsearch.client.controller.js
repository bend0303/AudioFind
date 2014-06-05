'use strict';

angular.module('audiosearch').controller('MainsearchController',
	function($scope, $http) {
        $scope.docresults = {};
        $scope.query = '';

        $scope.findDoc = function() {
            var responsePromise = $http.get('/audiodocs/search/' + $scope.query);

            responsePromise.success(function(data, status, headers, config) {
                $scope.docresults = _.pluck(data, 'obj');
            });
            responsePromise.error(function(data, status, headers, config) {

            });
        };

    }
);
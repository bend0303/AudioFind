'use strict';

angular.module('audiosearch').controller('MainsearchController', ['$scope', '$http', 'AudioService',
	function($scope, $http, AudioService) {
        $scope.docresults = {};
        $scope.query = '';
        $scope.player = AudioService;
        $scope.player.load('/uploads/test.mp3');
        $scope.player.on('timeupdate',function(){
            $scope.$apply();
        })
        $scope.$watch('query', function() {
            $scope.docresults = {};
        });
        $scope.findDoc = function() {
            var responsePromise = $http.get('/audiodocs/search/' + $scope.query);
            responsePromise.success(function(data, status, headers, config) {
                $scope.docresults = data;

            });
            responsePromise.error(function(data, status, headers, config) {
            });
        };
    }]
);
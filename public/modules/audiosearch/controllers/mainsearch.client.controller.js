'use strict';

angular.module('audiosearch').controller('MainsearchController', ['$scope', '$http', 'AudioService', 'logger',
	function($scope, $http, AudioService, logger) {
        $http.get('/getusers').success(function (response) {
            //If successful we assign the response to the global user model
            $scope.usersemil = response;
            //And redirect to the index page
        }).error(function (response) {

        });
        $scope.shareWithUser = function($item, obj) {
            var data = {};
            data.sharedWithUser = $item;
            data.sharedDoc = obj.doc;
            console.log(data);
            $http.post('/sharedoc', data).success(function (response) {
                $scope.notify('success', data.sharedDoc.subject,data.sharedWithUser.name)
                console.log();
            }).error(function (response) {

            });
         };

        $scope.notify = function (type, docname, username) {
            switch (type) {
                case 'info':
                    return logger.log('info');
                case 'success':
                    return logger.logSuccess('Youve successfully shared "' + docname + '" with ' + username);
                case 'warning':
                    return logger.logWarning('No result could be found for query.');
                case 'error':
                    return logger.logError('Oh snap! Change a few things up and try submitting again.');
            }
        };

        $scope.docresults = {};
        $scope.query = '';
        $scope.player = AudioService;
        $scope.player.load('/uploads/test.mp3');
        $scope.player.on('timeupdate',function(){
            $scope.$apply();
        });
        $scope.$watch('query', function() {
            $scope.docresults = {};
        });
        $scope.findDoc = function() {
            var responsePromise = $http.get('/audiodocs/search/' + $scope.query);
            responsePromise.success(function(data, status, headers, config) {

                $scope.docresults = data;
               if (_.isEmpty(data)) {
                   $scope.notify('warning');
               }

            });
            responsePromise.error(function(data, status, headers, config) {
            });
        };
    }]
);
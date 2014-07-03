'use strict';

angular.module('audiosearch').controller('MainsearchController', ['$scope', '$http', 'AudioService', 'logger',
        function ($scope, $http, AudioService, logger) {

            $scope.hasResults = false;
            $scope.hasOwnDocs = false;
            $scope.hasShared = false;

            $http.get('/getusers').success(function (response) {
                //If successful we assign the response to the global user model
                $scope.usersemil = response;
                //And redirect to the index page
            }).error(function (response) {

            });
            $scope.shareWithUser = function ($item, obj) {
                var data = {};
                data.sharedWithUser = $item;
                data.sharedDoc = obj.doc;
                console.log(data);
                $http.post('/sharedoc', data).success(function (response) {
                    $scope.notify('success', data.sharedDoc.subject, data.sharedWithUser.name)
                    console.log();
                }).error(function (response) {

                });
            };

            $scope.notify = function (type, msg1, msg2) {
                switch (type) {
                    case 'info':
                        return logger.log('info');
                    case 'success':
                        return logger.logSuccess('Youve successfully shared "' + msg1 + '" with ' + msg2);
                    case 'warning':
                        return logger.logWarning('Warning! ' + msg1);
                    case 'error':
                        return logger.logError('Oh snap! ' + msg1);
                }
            };

            $scope.owndocs = {};
            $scope.sharedocs = {};

            $scope.query = '';
            $scope.player = AudioService;
            $scope.player.on('timeupdate', function () {
                $scope.$apply();
            });

            $scope.loadAudio = function(path) {
                $scope.player.load(path);
            }
            $scope.$watch('query', function () {
                $scope.owndocs = {};
                $scope.sharedocs = {};
                $scope.hasResults = false;
                $scope.hasOwnDocs = false;
                $scope.hasShared = false;
            });
            $scope.findDoc = function () {
                if (!$scope.query) {
                    $scope.notify('warning', "Value of query is empty");
                    return;
                }
                var responsePromise = $http.get('/audiodocs/search/' + $scope.query);
                responsePromise.success(function (data, status, headers, config) {
                    if (_.isEmpty(data.owned) && _.isEmpty(data.shared)) {
                        $scope.notify('warning', "Can't find results for query: " + $scope.query);
                        return;
                    }

                    $scope.hasOwnDocs = !_.isEmpty(data.owned);
                    $scope.hasShared = !_.isEmpty(data.shared);
                    $scope.owndocs = data.owned;
                    $scope.sharedocs = data.shared;
                    $scope.hasResults = true;

                });

                responsePromise.error(function (data, status, headers, config) {
                    $scope.notify('error', 'Error has occured with searching');
                });
            };
        }]
);
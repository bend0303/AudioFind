'use strict';


angular.module('audioupload').controller('UploadController', function($scope) {

    angular.element(document).ready(function () {
        navigator.webkitGetUserMedia({audio:true}, callback, errorCallback);
    });


    function callback(stream) {
        var context = new webkitAudioContext();
        var mediaStreamSource = context.createMediaStreamSource(stream);
    }

    function errorCallback(err) {

    }
    $scope.hasResults = false;
    $scope.startUploading = function() {
        console.log('uploading....');
        $scope.loading = true;
    };
    $scope.uploadComplete = function (content) {
        console.log('upload complete');
        $scope.hasResults = true;
        $scope.uploadResponse = 'File:' + content.originalname + ' Has been uploaded'; // Presumed content is a json string!
        $scope.loading = false;

        // Clear form (reason for using the 'ng-model' directive on the input elements)
        $scope.fullname = '';
        $scope.gender = '';
        $scope.color = '';
        // Look for way to clear the input[type=file] element
    };
});
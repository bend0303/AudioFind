'use strict';


angular.module('audiosearch',['ngUpload']).controller('UploadController', function($scope) {

    angular.element(document).ready(function () {
        navigator.webkitGetUserMedia({audio:true}, callback, errorCallback);
    });


    function callback(stream) {
        var context = new webkitAudioContext();
        var mediaStreamSource = context.createMediaStreamSource(stream);
    }

    function errorCallback(err) {

    }

    $scope.startUploading = function() {
        console.log('uploading....')
        $scope.loading = true;
    };
    $scope.uploadComplete = function (content) {
        console.log('upload complete');

        $scope.uploadResponse = 'File:' + content + ' Has been uploaded'; // Presumed content is a json string!
        $scope.loading = false;

        // Clear form (reason for using the 'ng-model' directive on the input elements)
        $scope.fullname = '';
        $scope.gender = '';
        $scope.color = '';
        // Look for way to clear the input[type=file] element
    }
});
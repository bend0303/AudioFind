'use strict';


angular.module('audiosearch').controller('UploadController', function($scope) {

    $scope.startUploading = function() {
        console.log('uploading....')
        $scope.loading = true;
    };
    $scope.uploadComplete = function (content) {
        console.log('upload complete');

        $scope.uploadResponse = 'File:' + content.originalname + ' Has been uploaded'; // Presumed content is a json string!
        $scope.loading = false;

        // Clear form (reason for using the 'ng-model' directive on the input elements)
        $scope.fullname = '';
        $scope.gender = '';
        $scope.color = '';
        // Look for way to clear the input[type=file] element
    }
});
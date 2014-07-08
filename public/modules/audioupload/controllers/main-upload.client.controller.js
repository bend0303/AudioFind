'use strict';


angular.module('audioupload').controller('UploadController', function($scope) {

    $scope.hasResults = false;
    $scope.startUploading = function() {
        console.log('uploading....');
        $scope.loading = true;
    };
    $scope.uploadComplete = function (content) {
        console.log(content);
        $scope.hasResults = true;
        $scope.uploadResponse = 'File:' + content.filepath.split('/')[2] + ' Has been uploaded'; // Presumed content is a json string!
        $scope.uploadContent = content;
        $scope.loading = false;

        // Clear form (reason for using the 'ng-model' directive on the input elements)
        $scope.fullname = '';
        $scope.gender = '';
        $scope.color = '';
        // Look for way to clear the input[type=file] element
    };
});
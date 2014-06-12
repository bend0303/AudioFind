'use strict';


angular.module('audiosearch',['angularFileUpload']).controller('UploadController',['$scope','$upload',
    function($scope, $upload) {
        $scope.onFileSelect = function ($files) {
            //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                console.log('file is ' + JSON.stringify(file));
                $scope.upload = $upload.upload({
                    //url: 'http://localhost:9292/www.google.com/speech-api/v2/recognize?output=json&lang=en-us&key=AIzaSyD5rlPiYhD3p-0rRoUQ9QCleq-aN_ZlyGY', //upload.php script, node.js route, or servlet url
                    url: '/server/upload/url',
                    method: 'POST',
                    //headers: {'Content-Type':'application/json'},
                    //headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    headers: {'Content-Type':'audio/x-flac; rate=44100'},
                    //transformRequest: function(data) { return data; },
                    transformRequest: angular.identity,
                     //withCredentials: true,
                    //data: {myObj: $scope.myModelObj},
                    file: file // or list of files: $files for html5 only
                    /* set the file formData name ('Content-Desposition'). Default is 'file' */
                    //fileFormDataName: myFile, //or a list of names for multiple files (html5).
                    /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
                    //formDataAppender: function(formData, key, val){}
                }).progress(function (evt) {
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).error(function (data) {
                    // file is uploaded successfully
                    console.log('error');
                    //console.log(data);
                }).success(function (data, status, headers, config) {
                    // file is uploaded successfully
                    console.log('success');
                    console.log(data);
                });
                //.error(...)
                //.then(success, error, progress);
                //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
            }
            /* alternative way of uploading, send the file binary with the file's content-type.
             Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed.
             It could also be used to monitor the progress of a normal http post/put request with large data*/
            // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
        };
    }
]);
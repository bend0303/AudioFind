'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
        // This provides Authentication context.

        $scope.signin = '/modules/users/views/signin.client.view.html';
        $scope.signup = '/modules/users/views/signup.client.view.html';
        $scope.formsrc = $scope.signin;

        $scope.changeForm = function () {
            if ($scope.formsrc === $scope.signin) {
                $scope.formsrc = $scope.signup;
                return;
            }
            $scope.formsrc = $scope.signin;
        };
        $scope.authentication = Authentication;
      }
]);
'use strict';

// Audiodocs controller
angular.module('audiodocs').controller('AudiodocsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Audiodocs',
	function($scope, $stateParams, $location, Authentication, Audiodocs ) {
		$scope.authentication = Authentication;

		// Create new Audiodoc
		$scope.create = function() {
			// Create new Audiodoc object
			var audiodoc = new Audiodocs ({
				name: this.name
			});

			// Redirect after save
			audiodoc.$save(function(response) {
				$location.path('audiodocs/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Audiodoc
		$scope.remove = function( audiodoc ) {
			if ( audiodoc ) { audiodoc.$remove();

				for (var i in $scope.audiodocs ) {
					if ($scope.audiodocs [i] === audiodoc ) {
						$scope.audiodocs.splice(i, 1);
					}
				}
			} else {
				$scope.audiodoc.$remove(function() {
					$location.path('audiodocs');
				});
			}
		};

		// Update existing Audiodoc
		$scope.update = function() {
			var audiodoc = $scope.audiodoc ;

			audiodoc.$update(function() {
				$location.path('audiodocs/' + audiodoc._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Audiodocs
		$scope.find = function() {
			$scope.audiodocs = Audiodocs.query();
		};

		// Find existing Audiodoc
		$scope.findOne = function() {
			$scope.audiodoc = Audiodocs.get({ 
				audiodocId: $stateParams.audiodocId
			});
		};
	}
]);
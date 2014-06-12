'use strict';

//Setting up route
angular.module('audioupload').config(['$stateProvider',
	function($stateProvider) {
		// Audioupload state routing
		$stateProvider.
		state('addfile', {
			url: '/addfile',
			templateUrl: 'modules/audioupload/views/addfile.client.view.html'
		});
	}
]);
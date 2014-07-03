'use strict';

//Setting up route
angular.module('audioupload').config(['$stateProvider',
	function($stateProvider) {
		// Audioupload state routing
		$stateProvider.
		state('addfile', {
			url: '/addfile',
			templateUrl: 'modules/audioupload/views/addfile.client.view.html'
		}).state('recordfile', {
            url: '/recordfile',
            templateUrl: 'modules/audioupload/views/record.client.view.html'
        });
	}
]);
'use strict';

//Setting up route
angular.module('audiosearch').config(['$stateProvider',
	function($stateProvider) {
		// Audiosearch state routing
		$stateProvider.
		state('mainsearch', {
			url: '/mainsearch',
			templateUrl: 'modules/audiosearch/views/mainsearch.client.view.html'
		}).
		state('searchresults', {
			url: '/results',
			templateUrl: 'modules/audiosearch/views/searchresults.client.view.html'
		});
	}
]);
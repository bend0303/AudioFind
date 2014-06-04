'use strict';

//Setting up route
angular.module('audiodocs').config(['$stateProvider',
	function($stateProvider) {
		// Audiodocs state routing
		$stateProvider.
		state('listAudiodocs', {
			url: '/audiodocs',
			templateUrl: 'modules/audiodocs/views/list-audiodocs.client.view.html'
		}).
		state('createAudiodoc', {
			url: '/audiodocs/create',
			templateUrl: 'modules/audiodocs/views/create-audiodoc.client.view.html'
		}).
		state('viewAudiodoc', {
			url: '/audiodocs/:audiodocId',
			templateUrl: 'modules/audiodocs/views/view-audiodoc.client.view.html'
		}).
		state('editAudiodoc', {
			url: '/audiodocs/:audiodocId/edit',
			templateUrl: 'modules/audiodocs/views/edit-audiodoc.client.view.html'
		});
	}
]);
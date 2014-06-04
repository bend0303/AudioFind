'use strict';

//Audiodocs service used to communicate Audiodocs REST endpoints
angular.module('audiodocs').factory('Audiodocs', ['$resource',
	function($resource) {
		return $resource('audiodocs/:audiodocId', { audiodocId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('audiodocs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Audiodocs', 'audiodocs', 'dropdown', '/audiodocs(/create)?');
		Menus.addSubMenuItem('topbar', 'audiodocs', 'List Audiodocs', 'audiodocs');
		Menus.addSubMenuItem('topbar', 'audiodocs', 'New Audiodoc', 'audiodocs/create');
	}
]);
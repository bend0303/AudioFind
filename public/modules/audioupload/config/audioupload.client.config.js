'use strict';

// Configuring the Articles module
angular.module('audioupload').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'AudioFiles', 'audioupload', 'dropdown');
		Menus.addSubMenuItem('topbar', 'audioupload', 'Add File', 'addfile');
	}
]);
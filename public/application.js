'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]).run( function($rootScope, $location, $http) {

//    $rootScope.isLogged = function (url) {
//
//        var responsePromise = $http.get("/users/me");
//
//        responsePromise.success(function(data, status, headers, config) {
//            if (data == "null") {
//                $location.path("/land");
//            } else if (url.next == "/land") {
//                $location.path("/home")
//            }
//        });
//        responsePromise.error(function(data, status, headers, config) {
//            $location.path("/land");
//        });
//    }
//    // register listener to watch route changes
//    $rootScope.$on("$stateChangeStart", function (event, next, current) {
//        $rootScope.isLogged(next.url);
//
//    });
});

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
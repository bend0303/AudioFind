'use strict';

(function() {
	// Audiodocs Controller Spec
	describe('Audiodocs Controller Tests', function() {
		// Initialize global variables
		var AudiodocsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Audiodocs controller.
			AudiodocsController = $controller('AudiodocsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Audiodoc object fetched from XHR', inject(function(Audiodocs) {
			// Create sample Audiodoc using the Audiodocs service
			var sampleAudiodoc = new Audiodocs({
				name: 'New Audiodoc'
			});

			// Create a sample Audiodocs array that includes the new Audiodoc
			var sampleAudiodocs = [sampleAudiodoc];

			// Set GET response
			$httpBackend.expectGET('audiodocs').respond(sampleAudiodocs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.audiodocs).toEqualData(sampleAudiodocs);
		}));

		it('$scope.findOne() should create an array with one Audiodoc object fetched from XHR using a audiodocId URL parameter', inject(function(Audiodocs) {
			// Define a sample Audiodoc object
			var sampleAudiodoc = new Audiodocs({
				name: 'New Audiodoc'
			});

			// Set the URL parameter
			$stateParams.audiodocId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/audiodocs\/([0-9a-fA-F]{24})$/).respond(sampleAudiodoc);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.audiodoc).toEqualData(sampleAudiodoc);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Audiodocs) {
			// Create a sample Audiodoc object
			var sampleAudiodocPostData = new Audiodocs({
				name: 'New Audiodoc'
			});

			// Create a sample Audiodoc response
			var sampleAudiodocResponse = new Audiodocs({
				_id: '525cf20451979dea2c000001',
				name: 'New Audiodoc'
			});

			// Fixture mock form input values
			scope.name = 'New Audiodoc';

			// Set POST response
			$httpBackend.expectPOST('audiodocs', sampleAudiodocPostData).respond(sampleAudiodocResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Audiodoc was created
			expect($location.path()).toBe('/audiodocs/' + sampleAudiodocResponse._id);
		}));

		it('$scope.update() should update a valid Audiodoc', inject(function(Audiodocs) {
			// Define a sample Audiodoc put data
			var sampleAudiodocPutData = new Audiodocs({
				_id: '525cf20451979dea2c000001',
				name: 'New Audiodoc'
			});

			// Mock Audiodoc in scope
			scope.audiodoc = sampleAudiodocPutData;

			// Set PUT response
			$httpBackend.expectPUT(/audiodocs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/audiodocs/' + sampleAudiodocPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid audiodocId and remove the Audiodoc from the scope', inject(function(Audiodocs) {
			// Create new Audiodoc object
			var sampleAudiodoc = new Audiodocs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Audiodocs array and include the Audiodoc
			scope.audiodocs = [sampleAudiodoc];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/audiodocs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAudiodoc);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.audiodocs.length).toBe(0);
		}));
	});
}());
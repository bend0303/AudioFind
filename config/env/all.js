'use strict';

module.exports = {
	app: {
		title: 'AudioFind',
		description: 'AudioFind',
		keywords: 'AudioFind'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/animate.css/animate.min.css',
				'public/lib/toastr/toastr.css'
			],
			js: [
                'public/lib/audio5js/audio5.js',
                'public/lib/jquery/dist/jquery.min.js',
                'public/lib/toastr/toastr.js',
                'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/bootstrap-file-input/bootstrap.file-input.js',
                'public/lib/underscore/underscore.js',
                'public/recorder.js',
                'public/recorderWorker.js',
                'public/lib/ngUpload/ng-upload.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
'use strict';

angular.module('audiosearch').factory('AudioService', [
	function() {
        var params = {
            swf_path:'/lib/audio5js/audio5js.swf',
            throw_errors:true,
            format_time:true
        };

        var audio5js = new Audio5js(params);

        return audio5js;

    }
]);
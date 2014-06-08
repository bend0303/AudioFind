'use strict';

angular.module('audiosearch').filter('highlight', function($sce) {
    return function (text, phrase) {
        if (phrase) {
            var phrases = phrase.split(' ');
            for (var i =0; i <= phrases.length;i++) {
                text = text.replace(new RegExp('(' + phrases[i] + ')', 'gi'),
                    '<span class="highlighted">$1</span>');
            }
        }

        return $sce.trustAsHtml(text);
    };
});
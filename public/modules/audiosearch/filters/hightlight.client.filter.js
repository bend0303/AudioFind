'use strict';

angular.module('audiosearch').filter('highlight', function($sce) {
    return function (text, phrase) {
        if (phrase) {
            var phrases = phrase.split(" ");
            console.log(phrases);
            for (var i =0; i <= phrases.length;i++) {
                console.log(phrases[i]);
                text = text.replace(new RegExp('(' + phrases[i] + ')', 'gi'),
                    '<span class="highlighted">$1</span>');
            }
        }

        return $sce.trustAsHtml(text);
    };
});
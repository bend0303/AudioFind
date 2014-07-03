'use strict';

angular.module('audioupload').controller('RecorderControllerController', ['$scope',
	function() {
        debugger
        try {
            // shim
            console.log('onload');
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            navigator.getUserMedia = ( navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia);
            window.URL = window.URL || window.webkitURL

            audio_context = new AudioContext;
            console.log('Audio context OK');
            console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'OK' : 'fail'));

        } catch (e) {
            alert('No web audio support in this browser');
        }


        try {
            var recognition = new webkitSpeechRecognition();
        } catch(e) {
            alert('No web audio support in this browser');
        }
        recognition.continuous = true;
        recognition.interimResults = true;
        navigator.getUserMedia(
            {audio: true},
            successCallback,
            function (e) {console.log('No live audio input ' + e);}
        );
        var recording = false;
        var interimResult = '';
        var textArea = angular.element('#speech-page-content');
        var textAreaID = 'speech-page-content';
        var recorder, audio_context;


        function successCallback(stream) {
            console.log('successCallBack');
            var effect_level,
                source_level,
                delay,
                mix;
            var input = toMono(audio_context.createMediaStreamSource(stream));

            source_level = audio_context.createGain();
            effect_level = audio_context.createGain();
            effect_level.gain.level = 0.5;
            mix = audio_context.createGain();

            input.connect(source_level);
            input.connect(effect_level);

            // delay
            delay = audio_context.createDelay();
            effect_level.connect(delay);

            delay.connect(mix);
            source_level.connect(mix);

            mix.connect(audio_context.destination);

            console.log('input connected to destination');
            recorder = new Recorder(mix);
            console.log('recorder init\'d');
        }

        function toMono (input) {
            var split = audio_context.createChannelSplitter(2);
            var merge = audio_context.createChannelMerger(2);
            input.connect(split);
            split.connect(merge, 0, 0);
            split.connect(merge, 0, 1);
            return merge;
        }

        angular.element('.speech-content-mic').click(function(){
            if (!recording)
            {
                startRecognition();
            }
            else
            {
                stopRecognition();
            }
        });

        var startRecognition = function() {
            console.log('recording....');
            angular.element('.speech-content-mic').removeClass('speech-mic').addClass('speech-mic-works');
            recorder && recorder.record();
            recording = true;
            textArea.focus();
            recognition.start();
        };

        var stopRecognition = function() {
            console.log('stop recording');
            angular.element('.speech-content-mic').removeClass('speech-mic-works').addClass('speech-mic');
            recorder && recorder.stop();
            recorder && recorder.exportWAV(function(blob) {
                var url = URL.createObjectURL(blob);
                var li = document.createElement('li');
                var au = document.createElement('audio');
                var hf = document.createElement('a');
                au.controls = true;
                au.src = url;
                hf.href = url;
                hf.download = new Date().toISOString() + '.wav';
                hf.innerHTML = hf.download;
                li.appendChild(au);
                li.appendChild(hf);
                recordingslist.appendChild(li);
            });
            recording = false;
            recorder.clear();
            textArea.focusout();
            recognition.stop();
        };

        recognition.onresult = function (event) {
            var pos = textArea.getCursorPosition() - interimResult.length;
            textArea.val(textArea.val().replace(interimResult, ''));
            interimResult = '';
            textArea.setCursorPosition(pos);
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    insertAtCaret(textAreaID, event.results[i][0].transcript);
                } else {
                    insertAtCaret(textAreaID, event.results[i][0].transcript + '\u200B');
                    interimResult += event.results[i][0].transcript + '\u200B';
                }
            }
        };

        recognition.onend = function() {
            angular.element('.speech-content-mic').removeClass('speech-mic-works').addClass('speech-mic');
        };

        function insertAtCaret (areaId,text) {
            var txtarea = document.getElementById(areaId);
            var scrollPos = txtarea.scrollTop;
            var strPos = 0;
            var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
                "ff" : (document.selection ? "ie" : false ) );
            if (br == "ie") {
                txtarea.focus();
                var range = document.selection.createRange();
                range.moveStart ('character', -txtarea.value.length);
                strPos = range.text.length;
            }
            else if (br == "ff") strPos = txtarea.selectionStart;

            var front = (txtarea.value).substring(0,strPos);
            var back = (txtarea.value).substring(strPos,txtarea.value.length);
            txtarea.value=front+text+back;
            strPos = strPos + text.length;
            if (br == "ie") {
                txtarea.focus();
                range = document.selection.createRange();
                range.moveStart ('character', -txtarea.value.length);
                range.moveStart ('character', strPos);
                range.moveEnd ('character', 0);
                range.select();
            }
            else if (br == "ff") {
                txtarea.selectionStart = strPos;
                txtarea.selectionEnd = strPos;
                txtarea.focus();
            }
            txtarea.scrollTop = scrollPos;
        };

        textArea.getCursorPosition = function() {
            var el = $(this).get(0);
            var pos = 0;
            if('selectionStart' in el) {
                pos = el.selectionStart;
            } else if('selection' in document) {
                el.focus();
                var Sel = document.selection.createRange();
                var SelLength = document.selection.createRange().text.length;
                Sel.moveStart('character', -el.value.length);
                pos = Sel.text.length - SelLength;
            }
            return pos;
        };

        textArea.setCursorPosition = function(pos) {
            if ($(this).get(0).setSelectionRange) {
                $(this).get(0).setSelectionRange(pos, pos);
            } else if ($(this).get(0).createTextRange) {
                var range = $(this).get(0).createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        }

	}
]);
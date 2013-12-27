'use strict';
var html5Audio = require('./html5audio.js');
var Recorder = require('./recorder.js');

window.AudioContext = window.AudioContext ||
                          window.webkitAudioContext;

window.context = new AudioContext();
var inputPoint;

function initAudio(err, stream) {
    if (err) { alert('Permission for Audio denied'); }
    console.log('Audio stream', stream);
    inputPoint = context.createGain();
    var microphone = context.createMediaStreamSource(stream);
    microphone.connect(inputPoint);
    audioRecorder = new Recorder( inputPoint );
    zeroGain = audioContext.createGain();
    zeroGain.gain.value = 0.0;
    inputPoint.connect( zeroGain );
    zeroGain.connect( audioContext.destination );
}

window.addEventListener('load', function(e) {
    console.log('Asking for audio');
    html5Audio(initAudio);
});

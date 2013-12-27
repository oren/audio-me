'use strict';
var html5Audio = require('./html5audio.js');
var Recorder = require('./recorder.js');
var recorder;

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
    recorder = new Recorder( inputPoint, {workerPath: "/static/recorderWorker.js"} );
    var zeroGain = context.createGain();
    zeroGain.gain.value = 0.0;
    inputPoint.connect( zeroGain );
    zeroGain.connect( context.destination );
}

var recordBtn;
var stopBtn;

window.addEventListener('load', function(e) {
    console.log('Asking for audio');
    html5Audio(initAudio);
    recordBtn = document.getElementById('btn-record');
    stopBtn = document.getElementById('btn-stop');
    recordBtn.addEventListener('click', function(e) {
        console.log('recording');
    });

    stopBtn.addEventListener('click', function(e) {
        console.log('stop');
    });

});

'use strict';
var html5Audio = require('./html5audio.js');
var Recorder = require('./recorder.js');
var recorder;

window.AudioContext = window.AudioContext ||
                          window.webkitAudioContext;

window.context = new AudioContext();
var inputPoint, microphone;
var recordBtn;
var stopBtn;
var playBtn;

window.addEventListener('load', function(e) {
    console.log('Asking for audio');
    // Ask the user for the microphone
    html5Audio(initAudio);

    recordBtn = document.getElementById('btn-record');
    stopBtn = document.getElementById('btn-stop');
    playBtn = document.getElementById('btn-play');

    recordBtn.addEventListener('click', function(e) {
        recorder.record();
        console.log('recording');
    });

    stopBtn.addEventListener('click', function(e) {
        recorder.stop();
        console.log('stop');
    });

    playBtn.addEventListener('click', function(e) {
        console.log('play');
        recorder.getBuffer(getBufferCallback);
    });

});

function initAudio(err, stream) {
    if (err) { console.log('Permission for Audio denied'); return; }
    console.log('Audio stream', stream);

    inputPoint = context.createGain();
    microphone = context.createMediaStreamSource(stream);
    microphone.connect(inputPoint);

    recorder = new Recorder(inputPoint);

    var zeroGain = context.createGain();
    zeroGain.gain.value = 0.0;
    inputPoint.connect( zeroGain );
    zeroGain.connect( context.destination );
}

function getBufferCallback(buffers) {
    console.log(buffers);
    var newSource = context.createBufferSource();
    var newBuffer = context.createBuffer( 2, buffers[0].length, context.sampleRate );
    newBuffer.getChannelData(0).set(buffers[0]);
    newBuffer.getChannelData(1).set(buffers[1]);
    newSource.buffer = newBuffer;

    newSource.connect( context.destination );
    newSource.start(0);
}

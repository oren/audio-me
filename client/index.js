'use strict';
var html5Audio = require('./html5audio.js');
var Recorder = require('./recorder.js');
var recorder;
var shoe = require('shoe');
var saveAs = require('filesaver.js');

window.AudioContext = window.AudioContext ||
                          window.webkitAudioContext;

window.context = new AudioContext();
var inputPoint, microphone;
var recordBtn;
var stopBtn;
var playBtn;
var exportBtn;

window.addEventListener('load', function(e) {
    console.log('Asking for audio');
    // Ask the user for the microphone
    html5Audio(initAudio);

    recordBtn = document.getElementById('btn-record');
    stopBtn = document.getElementById('btn-stop');
    playBtn = document.getElementById('btn-play');
    exportBtn = document.getElementById('btn-export');

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
        recorder.getBuffer(sendToServer);
    });

    exportBtn.addEventListener('click', function(e) {
        console.log('export');
        recorder.exportWAV(exportWav);
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

var stream;
stream = shoe('/record');
console.log(stream);
window.stream = stream;

function sendToServer(buffer) {
    var base64 = arrayBufferToBase64(buffer);
    stream.write(base64);
}

function arrayBufferToBase64( buffer ) {
    var binary = ''
    var bytes = new Uint8Array( buffer )
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] )
    }
    return window.btoa( binary );
}


function exportWav(blob) {
    console.log('export');
    saveAs(blob, 'client-foo.wav');
}

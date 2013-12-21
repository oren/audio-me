'use strict';
var html5Audio = require('./html5Audio.js');

function initAudio(err, stream) {
    if (err) { alert('Permission for Audio denied'); }
    console.log('Audio stream', stream);
}

window.addEventListener('load', function(e) {
    html5Audio(initAudio);
});

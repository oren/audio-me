'use strict';

function html5Audio(cb) {
    if (!navigator.getUserMedia)
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (!navigator.cancelAnimationFrame)
        navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
    if (!navigator.requestAnimationFrame)
        navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

    function success(stream) {
        cb(null, stream)
    }

    function error(e) {
        cb(e, null)
    }

    navigator.getUserMedia({audio:true}, success, error);
}



module.exports = html5Audio

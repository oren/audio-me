function initAudioStream(stream) {
    alert('got audio permission');
}

function permissionDenied(e) {
    alert('Error getting audio');
    console.log(e);
}

function askForAudio() {
    if (!navigator.getUserMedia)
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (!navigator.cancelAnimationFrame)
        navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
    if (!navigator.requestAnimationFrame)
        navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

    navigator.getUserMedia({audio:true}, initAudioStream, permissionDenied);
}

window.addEventListener('load', askForAudio );

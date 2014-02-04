'use strict';
// source: https://raw.github.com/mattdiamond/Recorderjs
var work = require('webworkify');

var Recorder = function(source, cfg){
    var config = cfg || {};
    var bufferLen = config.bufferLen || 4096;
    this.context = source.context;
    this.node = this.context.createJavaScriptNode(bufferLen, 2, 2);
    var worker = work(require('./recorder-worker.js'));

    worker.postMessage({
        command: 'init',
        config: {
            sampleRate: this.context.sampleRate
        }
    });

    var recording = false;
    var currCallback;

    this.node.onaudioprocess = function (e) {
        if (!recording) return;
        var left = e.inputBuffer.getChannelData(0);
        var right = e.inputBuffer.getChannelData(1);
        var buffer = [left, right];

        worker.postMessage({
            command: 'record',
            buffer: buffer
        });
    };

    this.configure = function (cfg) {
        for (var prop in cfg){
            if (cfg.hasOwnProperty(prop)) {
                config[prop] = cfg[prop];
            }
      }
    }

    this.record = function () {
        recording = true;
    }

    this.stop = function () {
        recording = false;
    }

    this.clear = function () {
        worker.postMessage({ command: 'clear' });
    }

    this.getBuffer = function (cb) {
        currCallback = cb || config.callback;
        worker.postMessage({ command: 'getBuffer' })
    }

    this.exportWAV = function (cb, type) {
        currCallback = cb || config.callback;
        type = type || config.type || 'audio/wav';
        if (!currCallback) throw new Error('Callback not set');
        worker.postMessage({
            command: 'exportWAV',
            type: type
        });
    }

    worker.onmessage = function(e){
        var blob = e.data;
        currCallback(blob);
    }

    source.connect(this.node);
    this.node.connect(this.context.destination);    //this should not be necessary
};

Recorder.forceDownload = function (blob, filename) {
    var url = (window.URL || window.webkitURL).createObjectURL(blob);
    var link = window.document.createElement('a');
    link.href = url;
    link.download = filename || 'output.wav';
    var click = document.createEvent("Event");
    click.initEvent("click", true, true);
    link.dispatchEvent(click);
}

module.exports = Recorder;


'use strict';

var strip = document.querySelector('.strip');
var audioSnap = document.querySelector('.snap');
var video = document.querySelector('.player');
var canvas = document.querySelector('.photo');
var ctx = canvas.getContext('2d');

function getVideo() {
  navigator.mediaDevices.getUserMedia({
    video: true,
    audioL: false
  }).then(function (localMediaStream) {
    console.log(localMediaStream);
    video.src = window.URL.createObjectURL(localMediaStream);
    video.play();
  }).catch(function (err) {
    return console.error('ERROR: ', err);
  });
}

function takePhoto() {
  audioSnap.currentTime = 0;
  audioSnap.play();

  var data = canvas.toDataURL('image/jpeg');
  var link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'photo');
  link.innerHTML = '<img src="' + data + '" alt="photo"/>';
  strip.insertBefore(link, strip.firstChild);
  // strip 比較像是 霸凌課
}

function paintToCanavas() {}

getVideo();
video.addEventListener('canplay', paintToCanavas);
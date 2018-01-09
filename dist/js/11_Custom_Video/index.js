'use strict';

var player = document.querySelector('.player');
var video = player.querySelector('.viewer');
var btnPlay = player.querySelector('.player-button');
var ranges = player.querySelectorAll('input[type="range"]');
var skipButtons = player.querySelectorAll('[data-skip]');
var progress = player.querySelector('.progress');
var progressBar = player.querySelector('.progress-filled');

function togglePlay() {
  var method = void 0;
  if (video.paused) {
    method = 'play';
    this.textContent = '❚❚';
  } else {
    method = 'pause';
    this.textContent = '▶';
  }
  video[method]();
}

function updateRange() {
  video[this.name] = this.value;
}

function skip() {
  var seconds = this.dataset.skip;
  video.currentTime += parseFloat(seconds);
}

function handleProgress() {
  var percent = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = percent + '%';
}

video.addEventListener('timeupdate', handleProgress); // progress

btnPlay.addEventListener('click', togglePlay);
ranges.forEach(function (range) {
  return range.addEventListener('change', updateRange);
});
skipButtons.forEach(function (button) {
  return button.addEventListener('click', skip);
});

// progress control
var progressEvents = ['mousemove', 'mousedown', 'mouseup', 'click'];
var mousedown = false;
progressEvents.forEach(function (progressEvent) {
  return progress.addEventListener(progressEvent, scrunb);
});

function scrunb(e) {
  var mouseType = e.type;
  console.log(mouseType, mousedown);
  if (mouseType === 'mousedown') mousedown = true;
  if (mouseType === 'mouseup') mousedown = false;
  if (mouseType === 'mousemove' && mousedown || mouseType === 'click') {
    var percent = e.offsetX / progress.offsetWidth * video.duration;
    video.currentTime = percent;
  }
}
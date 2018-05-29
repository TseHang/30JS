'use strict';

var speedContainer = document.querySelector('.speed');
var bar = document.querySelector('.speed-bar');
var video = document.querySelector('.video');

var isDown = false;
var max = 5;
var min = 0;

speedContainer.addEventListener('mousedown', handleDown);
speedContainer.addEventListener('mousemove', handleMove);
speedContainer.addEventListener('mouseup', handleUp);

function setRateAndHeight(e, $content) {
  var percent = (e.pageY - $content.offsetTop) / $content.offsetHeight;
  var playRate = percent * (max - min) + min;

  if (playRate < 0.5) playRate = 0.5;
  if (percent < 0.1) percent = 0.1;

  var height = Math.round(percent * 100) + '%';

  bar.style.height = height;
  bar.textContent = playRate.toFixed(2) + 'x';

  video.playbackRate = playRate; // set rate
}

function handleDown(e) {
  setRateAndHeight(e, this);
  isDown = true;
}

function handleMove(e) {
  if (isDown) {
    setRateAndHeight(e, this);
  }
}

function handleUp() {
  isDown = false;
}
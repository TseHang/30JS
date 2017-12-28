'use strict';

function playSound(e) {
  var keyCode = e.keyCode || this.getAttribute('data-key');
  var audio = document.querySelector('audio[data-key="' + keyCode + '"]');
  var button = document.querySelector('.key-button[data-key="' + keyCode + '"]');
  if (!audio) return;

  button.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

function removeTransition(e) {
  e.target.classList.remove('playing');
}

var keyButtons = Array.from(document.querySelectorAll('.key-button'));

keyButtons.forEach(function (keyButton) {
  return keyButton.addEventListener('transitionend', removeTransition);
});
keyButtons.forEach(function (keyButton) {
  return keyButton.addEventListener('click', playSound);
});
window.addEventListener('keydown', playSound);
function playSound(e) {
  const keyCode = e.keyCode || this.getAttribute('data-key');
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const button = document.querySelector(`.key-button[data-key="${keyCode}"]`);
  if (!audio) return;

  button.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

function removeTransition(e) {
  e.target.classList.remove('playing');
}

const keyButtons = Array.from(document.querySelectorAll('.key-button'));

keyButtons.forEach(keyButton => keyButton.addEventListener('transitionend', removeTransition));
keyButtons.forEach(keyButton => keyButton.addEventListener('click', playSound));
window.addEventListener('keydown', playSound);


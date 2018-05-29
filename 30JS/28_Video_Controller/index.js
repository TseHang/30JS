const speedContainer = document.querySelector('.speed');
const bar = document.querySelector('.speed-bar');
const video = document.querySelector('.video');

let isDown = false;
const max = 5;
const min = 0;

speedContainer.addEventListener('mousedown', handleDown);
speedContainer.addEventListener('mousemove', handleMove);
speedContainer.addEventListener('mouseup', handleUp);

function setRateAndHeight(e, $content) {
  let percent = (e.pageY - $content.offsetTop) / $content.offsetHeight;
  let playRate = (percent * (max - min)) + min;

  if (playRate < 0.5) playRate = 0.5;
  if (percent < 0.1) percent = 0.1;

  const height = `${Math.round(percent * 100)}%`;

  bar.style.height = height;
  bar.textContent = `${playRate.toFixed(2)}x`;

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

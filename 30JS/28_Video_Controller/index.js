const speedContainer = document.querySelector('.speed');
const bar = document.querySelector('.speed-bar');
const video = document.querySelector('.video');

let isDown = false;
const max = 5;
const min = 0;

speedContainer.addEventListener('mousedown', handleDown);
speedContainer.addEventListener('mousemove', handleMove);
speedContainer.addEventListener('mouseup', handleUp);


function handleDown(e) {
  let percent = (e.pageY - this.offsetTop) / this.offsetHeight;
  let playRate = (percent * (max - min)) + min;

  if (playRate < 0.5) playRate = 0.5;
  if (percent < 0.1) percent = 0.1;

  const height = `${Math.round(percent * 100)}%`;

  bar.style.height = height;
  bar.textContent = `${playRate.toFixed(2)}x`;

  video.playbackRate = playRate; // set rate
  isDown = true;
}


function handleMove(e) {
  if (isDown) {
    let percent = (e.pageY - this.offsetTop) / this.offsetHeight;
    let playRate = (percent * (max - min)) + min;

    if (playRate < 0.5) playRate = 0.5;
    if (percent < 0.1) percent = 0.1;

    const height = `${Math.round(percent * 100)}%`;

    bar.style.height = height;
    bar.textContent = `${playRate.toFixed(2)}x`;

    video.playbackRate = playRate; // set rate
  }
}

function handleUp() {
  isDown = false;
}

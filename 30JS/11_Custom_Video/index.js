const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const btnPlay = player.querySelector('.player-button');
const ranges = player.querySelectorAll('input[type="range"]');
const skipButtons = player.querySelectorAll('[data-skip]');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress-filled');

function togglePlay() {
  let method;
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
  const seconds = this.dataset.skip;
  video.currentTime += parseFloat(seconds);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

video.addEventListener('timeupdate', handleProgress); // progress

btnPlay.addEventListener('click', togglePlay);
ranges.forEach(range => range.addEventListener('change', updateRange));
skipButtons.forEach(button => button.addEventListener('click', skip));

// progress control
const progressEvents = ['mousemove', 'mousedown', 'mouseup', 'click'];
let mousedown = false;
progressEvents.forEach(progressEvent => progress.addEventListener(progressEvent, scrunb));

function scrunb(e) {
  const mouseType = e.type;
  console.log(mouseType, mousedown);
  if (mouseType === 'mousedown') mousedown = true;
  if (mouseType === 'mouseup') mousedown = false;
  if ((mouseType === 'mousemove' && mousedown) || mouseType === 'click') {
    const percent = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = percent;
  }
}

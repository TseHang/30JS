const strip = document.querySelector('.strip');
const audioSnap = document.querySelector('.snap');
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');

function getVideo() {
  navigator.mediaDevices.getUserMedia({
    video: true,
    audioL: false,
  }).then((localMediaStream) => {
    console.log(localMediaStream);
    video.src = window.URL.createObjectURL(localMediaStream);
    video.play();
  }).catch(err => console.error('ERROR: ', err));
}

function takePhoto() {
  audioSnap.currentTime = 0;
  audioSnap.play();

  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'photo');
  link.innerHTML = `<img src="${data}" alt="photo"/>`;
  strip.insertBefore(link, strip.firstChild);
  // strip 比較像是 霸凌課
}

function paintToCanavas() {
  
}

getVideo();
video.addEventListener('canplay', paintToCanavas);

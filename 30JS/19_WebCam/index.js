const strip = document.querySelector('.strip');
const audioSnap = document.querySelector('.snap');
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');

const redEffect = (pixels) => {
  const renderPixels = pixels;
  // 透過迴圈將取回的所有像素資料跑一次，i +=4 是因為四個一組(r,g,b,alpha）
  for (let i = 0; i < renderPixels.data.length; i += 4) {
    // 下面組合就是單純把R(紅色)增強達到紅色濾鏡的效果
    renderPixels.data[i + 0] = renderPixels.data[i + 0] + 100;
    renderPixels.data[i + 1] = renderPixels.data[i + 1] - 50;
    renderPixels.data[i + 2] = renderPixels.data[i + 2] * 0.5;
  }
  return renderPixels;
};

const rgbColorSplit = (pixels) => {
  const renderPixels = pixels;
  for (let i = 0; i < renderPixels.data.length; i += 4) {
    renderPixels.data[i - 150] = renderPixels.data[i + 0];
    renderPixels.data[i + 500] = renderPixels.data[i + 1];
    renderPixels.data[i - 550] = renderPixels.data[i + 2];
  }
  return renderPixels;
};

function getVideo() {
  navigator.mediaDevices.getUserMedia({
    video: true,
    audioL: false,
  }).then((localMediaStream) => {
    video.src = window.URL.createObjectURL(localMediaStream);
    video.play();
  }).catch(err => console.error('ERROR: ', err));
}

function paintToCanavas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    const pixels = ctx.getImageData(0, 0, width, height);
    ctx.putImageData(rgbColorSplit(pixels), 0, 0);
  });
}

function takePhoto() {
  audioSnap.currentTime = 0;
  audioSnap.play();

  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'photo');
  link.textContent = 'Download Image';
  link.innerHTML = `<img src="${data}" alt="photo"/>`;
  strip.insertBefore(link, strip.firstChild);
}

getVideo();
video.addEventListener('canplay', paintToCanavas);

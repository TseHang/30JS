'use strict';

var strip = document.querySelector('.strip');
var audioSnap = document.querySelector('.snap');
var video = document.querySelector('.player');
var canvas = document.querySelector('.photo');
var ctx = canvas.getContext('2d');

var redEffect = function redEffect(pixels) {
  var renderPixels = pixels;
  // 透過迴圈將取回的所有像素資料跑一次，i +=4 是因為四個一組(r,g,b,alpha）
  for (var i = 0; i < renderPixels.data.length; i += 4) {
    // 下面組合就是單純把R(紅色)增強達到紅色濾鏡的效果
    renderPixels.data[i + 0] = renderPixels.data[i + 0] + 100;
    renderPixels.data[i + 1] = renderPixels.data[i + 1] - 50;
    renderPixels.data[i + 2] = renderPixels.data[i + 2] * 0.5;
  }
  return renderPixels;
};

var rgbColorSplit = function rgbColorSplit(pixels) {
  var renderPixels = pixels;
  for (var i = 0; i < renderPixels.data.length; i += 4) {
    renderPixels.data[i - 150] = renderPixels.data[i + 0];
    renderPixels.data[i + 500] = renderPixels.data[i + 1];
    renderPixels.data[i - 550] = renderPixels.data[i + 2];
  }
  return renderPixels;
};

function getVideo() {
  navigator.mediaDevices.getUserMedia({
    video: true,
    audioL: false
  }).then(function (localMediaStream) {
    video.src = window.URL.createObjectURL(localMediaStream);
    video.play();
  }).catch(function (err) {
    return console.error('ERROR: ', err);
  });
}

function paintToCanavas() {
  var width = video.videoWidth;
  var height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(function () {
    ctx.drawImage(video, 0, 0, width, height);

    var pixels = ctx.getImageData(0, 0, width, height);
    ctx.putImageData(rgbColorSplit(pixels), 0, 0);
  });
}

function takePhoto() {
  audioSnap.currentTime = 0;
  audioSnap.play();

  var data = canvas.toDataURL('image/jpeg');
  var link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'photo');
  link.textContent = 'Download Image';
  link.innerHTML = '<img src="' + data + '" alt="photo"/>';
  strip.insertBefore(link, strip.firstChild);
}

getVideo();
video.addEventListener('canplay', paintToCanavas);
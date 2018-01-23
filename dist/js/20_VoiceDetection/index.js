'use strict';

// 將全域環境中的 SpeechRecognition 指好(依據不同瀏覽器)
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

// 讓語音識別回傳識別後的資訊（預設為false)
recognition.interimResults = true;

var p = document.querySelector('.text');
var wrapper = document.querySelector('.wrapper');
var btnStart = document.querySelector('.btn-start');
var btnStop = document.querySelector('.btn-stop');
var isClickStop = false;

wrapper.appendChild(p);

// 監聽識別回傳
recognition.addEventListener('result', function (e) {
  console.log(e.results);
});

// 監聽如果語音識別結束，則在開啟一次新的識別
recognition.addEventListener('end', function () {
  return !isClickStop && recognition.start;
});

// 開始識別
btnStart.addEventListener('click', function () {
  return recognition.start();
});
btnStop.addEventListener('click', function () {
  isClickStop = true;
  recognition.stop();
});
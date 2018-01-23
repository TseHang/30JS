// 將全域環境中的 SpeechRecognition 指好(依據不同瀏覽器)
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// 讓語音識別回傳識別後的資訊（預設為false)
recognition.interimResults = true;

const p = document.querySelector('.text');
const wrapper = document.querySelector('.wrapper');
const btnStart = document.querySelector('.btn-start');
const btnStop = document.querySelector('.btn-stop');
let isClickStop = false;

wrapper.appendChild(p);

// 監聽識別回傳
recognition.addEventListener('result', (e) => {
  console.log(e.results);
});

// 監聽如果語音識別結束，則在開啟一次新的識別
recognition.addEventListener('end', () => !isClickStop && recognition.start);

// 開始識別
btnStart.addEventListener('click', () => recognition.start());
btnStop.addEventListener('click', () => {
  isClickStop = true;
  recognition.stop();
});


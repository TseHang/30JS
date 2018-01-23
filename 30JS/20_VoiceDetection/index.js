// 將全域環境中的 SpeechRecognition 指好(依據不同瀏覽器)
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// 讓語音識別回傳識別後的資訊（預設為false)
recognition.interimResults = true;

// let text = document.createElement('p');
// const wrapper = document.querySelector('.wrapper');
let text = document.createElement('p');
const holdText = document.querySelector('.pre-hold');
const wrapper = document.querySelector('.wrapper');
const btnStart = document.querySelector('.btn-start');
const btnStop = document.querySelector('.btn-stop');
let isClickStop = false;

// Fired when the speech recognition service returns a result,
// a word or phrase has been positively recognized and this has been communicated back to the app.
recognition.addEventListener('result', (e) => {
  const transcript = Array.from(e.results)
    .map(result => result[0].transcript)
    .join('');

  text.textContent = transcript;
  wrapper.appendChild(text);

  // 如果回傳內容已經結束（一段話的結尾）在建立一個新的p元素來放下一段文字
  if (e.results[0].isFinal) {
    text = document.createElement('p');
    wrapper.appendChild(text);

    if (transcript.includes('笨蛋')) {
      alert('Bingo!');
      isClickStop = true;
    }
  }
});

// 監聽如果語音識別結束，則在開啟一次新的識別
recognition.addEventListener('end', () => !isClickStop && recognition.start());

// 開始識別
btnStart.addEventListener('click', () => {
  recognition.start();
  holdText.textContent = 'Listening...';
});
btnStop.addEventListener('click', () => {
  isClickStop = true;
  recognition.stop();
  holdText.textContent = 'I can hear you! ^_^';
});


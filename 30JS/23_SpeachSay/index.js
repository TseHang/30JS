// 將全域環境中的 SpeechRecognition 指好(依據不同瀏覽器)
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

// 讓語音識別回傳識別後的資訊（預設為false)
recognition.interimResults = true;

let text = document.createElement('p');
const holdText = document.querySelector('.pre-hold');
const wrapper = document.querySelector('.wrapper');
const btnStart = document.querySelector('#listen-start');
const btnStop = document.querySelector('#listen-stop');
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

btnStart.addEventListener('click', () => {
  recognition.start();
  holdText.textContent = 'Listening...';
});
btnStop.addEventListener('click', () => {
  isClickStop = true;
  recognition.stop();
  holdText.textContent = 'I can hear you! ^_^';
});

// ---------------------------------
// Read info!
const synth = window.speechSynthesis;
const msg = new SpeechSynthesisUtterance();
const rateRange = document.querySelector('[name="rate"]');
const dropDownVoices = document.querySelector('[name="voice"]');
const speakStartBtn = document.querySelector('#speak-start');
const speakStopBtn = document.querySelector('#speak-stop');

let voices = [];

function populateVoices() {
  voices = synth.getVoices();
  // 第一種做法
  // voices.forEach((voice) => {
  //   const option = document.createElement('option');
  //   option.textContent = `${voice.name} (${voice.lang})`;
  //   option.setAttribute('value', voice.name);
  //   dropDownVoices.appendChild(option);
  // });
  // 第二種做法
  dropDownVoices.innerHTML = Array.from(voices).map((voice) => {
    const { name, lang } = voice;
    return `<option value="${name}">${name}  (${lang})</option>`;
  }).join('');
}

function setVoice() {
  // msg.voice should be typeof speechSynthesis
  msg.voice = voices.find(voice => voice.name === this.value);
  toggleSpeak();
}

function setOpts() {
  // Don't transform to float, use string is ok!
  msg[this.name] = this.value;
}

function toggleSpeak(startOver = true) {
  synth.cancel();
  if (startOver) {
    msg.text = document.querySelector('[name="text"]').value;
    synth.speak(msg);
  }
}

synth.addEventListener('voiceschanged', populateVoices);
dropDownVoices.addEventListener('change', setVoice);
rateRange.addEventListener('change', setOpts);
speakStartBtn.addEventListener('click', toggleSpeak);
speakStopBtn.addEventListener('click', () => toggleSpeak(false));

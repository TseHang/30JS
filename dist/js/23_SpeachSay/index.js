'use strict';

// 將全域環境中的 SpeechRecognition 指好(依據不同瀏覽器)
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

// 讓語音識別回傳識別後的資訊（預設為false)
recognition.interimResults = true;

var text = document.createElement('p');
var holdText = document.querySelector('.pre-hold');
var wrapper = document.querySelector('.wrapper');
var btnStart = document.querySelector('#listen-start');
var btnStop = document.querySelector('#listen-stop');
var isClickStop = false;

// Fired when the speech recognition service returns a result,
// a word or phrase has been positively recognized and this has been communicated back to the app.
recognition.addEventListener('result', function (e) {
  var transcript = Array.from(e.results).map(function (result) {
    return result[0].transcript;
  }).join('');

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
recognition.addEventListener('end', function () {
  return !isClickStop && recognition.start();
});

btnStart.addEventListener('click', function () {
  recognition.start();
  holdText.textContent = 'Listening...';
});
btnStop.addEventListener('click', function () {
  isClickStop = true;
  recognition.stop();
  holdText.textContent = 'I can hear you! ^_^';
});

// ---------------------------------
// Read info!
var synth = window.speechSynthesis;
var msg = new SpeechSynthesisUtterance();
var rateRange = document.querySelector('[name="rate"]');
var dropDownVoices = document.querySelector('[name="voice"]');
var speakStartBtn = document.querySelector('#speak-start');
var speakStopBtn = document.querySelector('#speak-stop');

var voices = [];

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
  dropDownVoices.innerHTML = Array.from(voices).map(function (voice) {
    var name = voice.name,
        lang = voice.lang;

    return '<option value="' + name + '">' + name + '  (' + lang + ')</option>';
  }).join('');
}

function setVoice() {
  var _this = this;

  // msg.voice should be typeof speechSynthesis
  msg.voice = voices.find(function (voice) {
    return voice.name === _this.value;
  });
  toggleSpeak();
}

function setOpts() {
  // Don't transform to float, use string is ok!
  msg[this.name] = this.value;
}

function toggleSpeak() {
  var startOver = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

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
speakStopBtn.addEventListener('click', function () {
  return toggleSpeak(false);
});
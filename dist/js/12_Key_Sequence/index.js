'use strict';

var proceed = [];
var secret = 'hang';
window.addEventListener('keydown', function (e) {
  var value = e.key;
  proceed.push(value);
  var arrCut = proceed.slice(-secret.length);
  var input = document.querySelector('#input');

  input.textContent = arrCut.join('-');
  if (arrCut.join('').includes(secret)) {
    setTimeout(function () {
      return alert('Yo, you\'re bingo! ');
    }, 0); // delay 一下，讓畫面 input 先出現
  }
});
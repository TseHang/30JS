'use strict';

var today = new Date();
var $pDate = document.querySelector('.date');
var $min = document.querySelector('.min');
var $sec = document.querySelector('.sec');

var $btn1 = document.querySelector('.btn1');
var $btn2 = document.querySelector('.btn2');
var $btnStart = document.querySelector('.btn_start');
var $btnStop = document.querySelector('.btn_stop');

var timer = void 0;
var setTime = 0;

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var setTimeCountDown = function setTimeCountDown(secs) {
  return function () {
    var array = transform(secs);
    var timeString = array.map(function (el) {
      if (el.toString().length < 2) return '0' + el;
      return el.toString();
    });

    $sec.textContent = timeString[0];
    $min.textContent = timeString[1];
    setTime = secs;
    console.log(setTime, secs);
  };
};

$pDate.textContent = formatDate(today, '');
$btn1.addEventListener('click', setTimeCountDown(20));
$btn2.addEventListener('click', setTimeCountDown(60 * 5));
$btnStart.addEventListener('click', start);
$btnStop.addEventListener('click', stop);

function start() {
  timer = setTimeout(countDown, 1000);
}

function stop() {
  clearTimeout(timer);
}

function countDown() {
  setTime -= 1;
  setTimeCountDown(setTime)();
  start();
}

function transform(secs) {
  if (secs <= 0) return ['00', '00', '00'];

  var time = secs;
  var sec = time % 60;

  time = Math.floor(time / 60);
  var min = time % 60;

  time = Math.floor(time / 60);
  var hour = Math.floor(time / 60);

  return [sec, min, hour];
}

function formatDate(date) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var result = /Y{1,4}-M{1,2}-D{1,2}/.exec(format);
  var day = date.getDate();
  var monthIdx = date.getMonth();
  var year = date.getFullYear();

  var hour = date.getHours();
  var min = date.getMinutes();

  if (!result) return hour + ':' + min + ', ' + day + ' ' + monthNames[monthIdx] + ', ' + year;

  switch (result[0]) {
    case 'YYYY-MM-DD':
      return year + '-' + (monthIdx + 1) + '-' + day + ' ' + hour + ':' + min;
    default:
      return hour + ':' + min + ', ' + day + ' ' + monthNames[monthIdx] + ', ' + year;
  }
}
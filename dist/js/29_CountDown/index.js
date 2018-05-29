'use strict';

var today = new Date();
var $p_date = document.querySelector('.date');
var $min = document.querySelector('.min');
var $sec = document.querySelector('.sec');

var $btn1 = document.querySelector('.btn1');
var $btn2 = document.querySelector('.btn2');

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var countDown = function countDown(secs) {
  var time = secs;
  var sec = time % 60;

  time = Math.floor(time / 60);
  var min = time % 60;

  time = Math.floor(time / 60);
  var hour = Math.floor(time / 60);

  var array = [sec, min, hour].map(function (el) {
    if (el.toString().length < 2) return '0' + el;
    return el.toString();
  });
  console.log(array);
};

$p_date.textContent = formatDate(today, '');

$btn1.addEventListener('click', countDown(5));
$btn2.addEventListener('click', countDown(60 * 5));

function formatDate(date, format) {
  // Todo: test format like moment
  console.log(format);
  var day = date.getDate();
  var monthIdx = date.getMonth();
  var year = date.getFullYear();

  var hour = date.getHours();
  var min = date.getMinutes();

  return hour + ':' + min + ', ' + day + ' ' + monthNames[monthIdx] + ', ' + year + ' ';
}
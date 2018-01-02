'use strict';

var handSecond = document.querySelector('.second-hand');
var handMin = document.querySelector('.min-hand');
var handHour = document.querySelector('.hour-hand');

var update = function update() {
  var now = new Date();
  var secondDegree = transformSeconds(now.getSeconds());
  var minDegree = transformMins(now.getMinutes());
  var hourDegree = transformHours(now.getHours(), now.getMinutes());

  handSecond.style.transform = 'rotate(' + (-90 + secondDegree) + 'deg)';
  handMin.style.transform = 'rotate(' + (-90 + minDegree) + 'deg)';
  handHour.style.transform = 'rotate(' + (-90 + hourDegree) + 'deg)';
  console.log(123);

  function transformSeconds(seconds) {
    return 360 / 60 * seconds;
  }

  function transformMins(mins) {
    return 360 / 60 * mins;
  }

  function transformHours(hours, mins) {
    return 360 / 12 * hours + 30 / 60 * mins;
  }
};

window.setInterval(update, 1000);
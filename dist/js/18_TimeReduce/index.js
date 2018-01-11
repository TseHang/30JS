'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var videos = document.querySelectorAll('[data-time]');
var timeArray = Array.from(videos).map(function (video) {
  return video.dataset.time;
});
var totalTime = timeArray.reduce(function (acc, cur) {
  var carryHour = 0,
      carryMin = 0;

  var time = transformTime(cur);

  var _time$map = time.map(function (val, i) {
    var total = val + acc[i];
    switch (i) {
      case 0:
        // hour
        return total;
      case 1:
        // min
        if (total > 60) {
          carryHour += Math.floor(total / 60);
          return total % 60;
        }
        return total;
      case 2:
        // sec
        if (total > 60) {
          carryMin += Math.floor(total / 60);
          return total % 60;
        }
        return total;
      default:
        break;
    }
  }),
      _time$map2 = _slicedToArray(_time$map, 3),
      hour = _time$map2[0],
      min = _time$map2[1],
      sec = _time$map2[2];

  return [hour + carryHour, min + carryMin, sec];
}, [0, 0, 0]);

console.log(totalTime);

function transformTime(str) {
  var time = str.split(':').map(function (value) {
    return parseInt(value, 10);
  });
  if (time.length !== 3) {
    time.splice(0, 0, 0); // Add hour = 0
  }
  return time;
}
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var canvas = document.querySelector('#draw');
var DEFAULT_COLOR = 'hsl(60, 100%, 50%)';
var isDrawing = false;
var lastX = 0;
var lastY = 0;
var direction = true; // 判斷粗細增減用

var _parseHue = parseHue(DEFAULT_COLOR),
    _parseHue2 = _slicedToArray(_parseHue, 3),
    hue = _parseHue2[0],
    saturation = _parseHue2[1],
    lightness = _parseHue2[2];

// feature 小畫家！

var initCanvas = function initCanvas(cs) {
  var ctx = cs.getContext('2d');
  cs.width = window.innerWidth;
  cs.height = window.innerWidth;
  ctx.strokeStyle = DEFAULT_COLOR; // 預設黃色
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = 1; // 線條寬度
};

initCanvas(canvas);

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', function (e) {
  isDrawing = true;
  var _ref = [e.offsetX, e.offsetY];
  lastX = _ref[0];
  lastY = _ref[1];
});
canvas.addEventListener('mouseup', function () {
  isDrawing = false;
});
canvas.addEventListener('mouseout', function () {
  isDrawing = false;
});

function draw(e) {
  var ctx = this.getContext('2d');
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();


  // change random color
  var _ref2 = [e.offsetX, e.offsetY];
  lastX = _ref2[0];
  lastY = _ref2[1];
  hue += 1;
  saturation += 1;
  ctx.strokeStyle = 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
  if (hue > 360) {
    hue = 0;
  }

  if (direction) {
    ctx.lineWidth += 1;
  } else {
    ctx.lineWidth -= 1;
  }

  if (ctx.lineWidth > 30 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
}

function parseHue(colorStr) {
  var color = colorStr.match(/[0-9]+,?/g); // match number exclude '%'
  return color.map(function (value) {
    return parseInt(value, 10);
  });
}
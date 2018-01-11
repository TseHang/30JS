'use strict';

var wrapper = document.querySelector('.wrapper');
var text = document.querySelector('.wrapper h1');
var walk = 0.02;
function shadow(e) {
  var left = wrapper.offsetLeft,
      top = wrapper.offsetTop;
  var x = e.screenX,
      y = e.screenY;


  var xWalk = Math.round((x - left) * walk);
  var yWalk = Math.round((y - top) * walk);

  text.style.textShadow = '\n    ' + xWalk + 'px ' + yWalk + 'px 0 #333,\n    ' + xWalk * -1 + 'px ' + yWalk + 'px 0 rgba(0,255,255,0.7),\n    ' + yWalk + 'px ' + xWalk * -1 + 'px 0 rgba(0,255,0,0.7),\n    ' + yWalk * -1 + 'px ' + xWalk + 'px 0 rgba(0,0,255,0.7)\n  ';
}

window.addEventListener('mousemove', shadow);
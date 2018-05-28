'use strict';

var items = document.querySelector('.items');
var isMouseDown = false;
var startX = 0;
var scroll = 0;

var down = function down(e) {
  isMouseDown = true;
  items.classList.add('active');

  startX = e.pageX - items.offsetLeft;
  scroll = items.scrollLeft;
};

var up = function up() {
  isMouseDown = false;
  items.classList.remove('active');
};

var move = function move(e) {
  if (isMouseDown) {
    e.preventDefault();
    var x = e.pageX - items.offsetLeft - startX;
    items.scrollLeft = scroll - x;
  }
};

items.addEventListener('mousedown', down);
items.addEventListener('mousemove', move);
items.addEventListener('mouseleave', up);
items.addEventListener('mouseup', up);
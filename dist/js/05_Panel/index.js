'use strict';

var panels = document.querySelectorAll('.panel');

panels.forEach(function (panel) {
  return panel.addEventListener('click', activeOpen);
});

function activeOpen() {
  this.classList.toggle('open');
}
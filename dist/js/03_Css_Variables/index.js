'use strict';

var inputs = document.querySelectorAll('input');

inputs.forEach(function (input) {
  input.addEventListener('change', update);
  input.addEventListener('mousemove', update);
});

function update() {
  var suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty('--' + this.name, this.value + suffix);
}
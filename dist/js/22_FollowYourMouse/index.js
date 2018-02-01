'use strict';

var triggers = document.querySelectorAll('a');
var highlight = document.createElement('span');

highlight.classList.add('highlight');
document.body.append(highlight);

function highlightLink() {
  var linkCoords = this.getBoundingClientRect();

  var cords = {
    left: linkCoords.x + window.scrollX,
    top: linkCoords.y + window.scrollY,
    width: linkCoords.width,
    height: linkCoords.height
  };

  highlight.style.width = cords.width + 'px';
  highlight.style.height = cords.height + 'px';
  highlight.style.transform = 'translate(' + cords.left + 'px, ' + cords.top + 'px)';
}

triggers.forEach(function (val) {
  return val.addEventListener('mouseenter', highlightLink);
});
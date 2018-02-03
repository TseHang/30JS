'use strict';

var nav = document.querySelector('#main');

window.addEventListener('scroll', function (e) {

  if (window.scrollY > nav.offsetTop) {
    nav.classList.add('red');
  } else {
    nav.classList.remove('red');
  }
});
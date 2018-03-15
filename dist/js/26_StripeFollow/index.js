'use strict';

var dropdownBg = document.querySelector('.dropdown-background');
var triggers = document.querySelectorAll('.cool > li');

triggers.forEach(function (trigger) {
  return trigger.addEventListener('mouseenter', handleEnter);
});
triggers.forEach(function (trigger) {
  return trigger.addEventListener('mouseleave', handleLeave);
});

function handleEnter() {
  var _this = this;

  this.classList.add('trigger-enter');
  setTimeout(function () {
    return _this.classList.add('trigger-enter-active');
  }, 150);
  dropdownBg.classList.add('open');

  var dropdown = this.querySelector('.dropdown');
  var dropdownCords = dropdown.getBoundingClientRect();

  dropdownBg.style.setProperty('transform', 'translate(' + dropdownCords.x + 'px, ' + dropdownCords.y + 'px)');
  dropdownBg.style.setProperty('width', dropdownCords.width + 'px');
  dropdownBg.style.setProperty('height', dropdownCords.height + 'px');
}

function handleLeave() {
  this.classList.remove('trigger-enter', 'trigger-enter-active');
  dropdownBg.classList.remove('open');
}
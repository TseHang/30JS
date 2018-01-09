'use strict';

var checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
var lastChecked = false;

checkboxes.forEach(function (value) {
  return value.addEventListener('click', handleClick);
});

function handleClick(e) {
  var _this = this;

  var inBetween = false;
  if (e.shiftKey && this.checked) {
    // prevent click myself
    if (lastChecked === this) return;

    checkboxes.forEach(function (checkbox) {
      if (checkbox === _this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }
      if (inBetween) {
        checkbox.checked = true;
      }
    });
  } else if (e.shiftKey && !this.checked) {
    // prevent click myself
    if (lastChecked === this) return;

    checkboxes.forEach(function (checkbox) {
      if (checkbox === _this || checkbox === lastChecked) {
        lastChecked.checked = false; // 把原本點擊的取消
        inBetween = !inBetween;
      }
      if (inBetween) {
        checkbox.checked = false;
      }
    });
  };
  lastChecked = this;
}
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
let lastChecked = false;

checkboxes.forEach(value => value.addEventListener('click', handleClick));

function handleClick(e) {
  let inBetween = false;
  if (e.shiftKey && this.checked) {
    // prevent click myself
    if (lastChecked === this) return;

    checkboxes.forEach((checkbox) => {
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }
      if (inBetween) {
        checkbox.checked = true;
      }
    });
  } else if (e.shiftKey && !this.checked) {
    // prevent click myself
    if (lastChecked === this) return;

    checkboxes.forEach((checkbox) => {
      if (checkbox === this || checkbox === lastChecked) {
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

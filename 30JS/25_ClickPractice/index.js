const divs = document.querySelectorAll('div');

function logText(e) {
  console.log(this.classList.value, e);
  // e.stopPropagation(); // stop bubbling!
}

divs.forEach(div => div.addEventListener('click', logText, {
  // 預設為 false, 會搜尋到你點到最裡面的那一層開始 bubbling 往外,
  // 若改為 true, 則由你點到的第一層（最外層）開始 bubbling,
  capture: false,
  once: true,
}));

'use strict';

var sliderImages = document.querySelectorAll('.slide-in');
var loadAll = false;

window.addEventListener('scroll', debounce(checkSlide));

// 如果單純使用scroll來操作的話，每次的畫面滾動都會有大量事件被觸發，
// 會對效能上造成影響，所以多寫了一個 debounce 來使觸發間隔為20毫秒以上：
function debounce(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var timeout = void 0;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = this;
    var callNow = immediate && !timeout;
    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function checkSlide() {
  console.log('checkSlide!');
  sliderImages.forEach(function (sliderImage, i, array) {
    if (loadAll) return;
    var slideInAt = window.scrollY + window.innerHeight;
    var isShown = slideInAt > sliderImage.offsetTop - sliderImage.height / 2;
    if (isShown) {
      var imageLink = sliderImage.dataset.imglink;
      sliderImage.setAttribute('src', imageLink);
      sliderImage.addEventListener('load', function () {
        sliderImage.classList.add('active');
        if (i === array.length - 1) {
          loadAll = true;
        }
      }, { once: true }); // once 表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。
    }
  });
}
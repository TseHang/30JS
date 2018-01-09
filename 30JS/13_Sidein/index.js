const sliderImages = document.querySelectorAll('.slide-in');
let loadAll = false;
// window.addEventListener('scroll', debounce(checkSlide));
window.addEventListener('scroll', checkSlide);

// 如果單純使用scroll來操作的話，每次的畫面滾動都會有大量事件被觸發，
// 會對效能上造成影響，所以多寫了一個 debounce 來使觸發間隔為20毫秒以上：
// function debounce(func, wait = 20, immediate = true) {
//   let timeout;
//   return function (...argument) {
//     const context = this;
//     const args = argument;
//     console.log(this, a)
//   }
// }

function checkSlide() {
  sliderImages.forEach((sliderImage, i, array) => {
    if (loadAll) return;
    console.log(123);
    const slideInAt = window.scrollY + window.innerHeight;
    const isShown = slideInAt > sliderImage.offsetTop;
    if (isShown) {
      const imageLink = sliderImage.dataset.imglink;
      sliderImage.setAttribute('src', imageLink);
      sliderImage.addEventListener('load', () => {
        sliderImage.classList.add('active');
        if (i === array.length - 1) {
          loadAll = true;
        }
      }, { once: true }); // once 表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。
    }
  });
}


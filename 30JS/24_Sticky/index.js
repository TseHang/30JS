const nav = document.querySelector('#main');

window.addEventListener('scroll', (e) => {

  if (window.scrollY > nav.offsetTop) {
    nav.classList.add('red');
  } else {
    nav.classList.remove('red');
  }
});

const wrapper = document.querySelector('.wrapper');
const text = document.querySelector('.wrapper h1');
const walk = 0.02;
function shadow(e) {
  const {
    offsetLeft: left,
    offsetTop: top,
  } = wrapper;
  const { screenX: x, screenY: y } = e;

  const xWalk = Math.round(((x - left) * walk));
  const yWalk = Math.round(((y - top) * walk));

  text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 #333,
    ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
    ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
    ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)
  `;
}

window.addEventListener('mousemove', shadow);

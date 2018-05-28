const items = document.querySelector('.items');
let isMouseDown = false;
let startX = 0;
let scroll = 0;

const down = (e) => {
  isMouseDown = true;
  items.classList.add('active');

  startX = e.pageX - items.offsetLeft;
  scroll = items.scrollLeft;
};

const up = () => {
  isMouseDown = false;
  items.classList.remove('active');
};

const move = (e) => {
  if (isMouseDown) {
    e.preventDefault();
    const x = e.pageX - items.offsetLeft - startX;
    items.scrollLeft = scroll - x;
  }
};

items.addEventListener('mousedown', down);
items.addEventListener('mousemove', move);
items.addEventListener('mouseleave', up);
items.addEventListener('mouseup', up);


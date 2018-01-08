const canvas = document.querySelector('#draw');
const DEFAULT_COLOR = 'hsl(60, 100%, 50%)';
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let direction = true; // 判斷粗細增減用
let [hue, saturation, lightness] = parseHue(DEFAULT_COLOR);

// feature 小畫家！

const initCanvas = (cs) => {
  const ctx = cs.getContext('2d');
  cs.width = window.innerWidth;
  cs.height = window.innerWidth;
  ctx.strokeStyle = DEFAULT_COLOR; // 預設黃色
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = 1; // 線條寬度
};

initCanvas(canvas);

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});
canvas.addEventListener('mouseout', () => {
  isDrawing = false;
});

function draw(e) {
  const ctx = this.getContext('2d');
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  // change random color
  hue += 1;
  saturation += 1;
  ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  if (hue > 360) {
    hue = 0;
  }

  if (direction) {
    ctx.lineWidth += 1;
  } else {
    ctx.lineWidth -= 1;
  }

  if (ctx.lineWidth > 30 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
}


function parseHue(colorStr) {
  const color = colorStr.match(/[0-9]+,?/g); // match number exclude '%'
  return color.map(value => parseInt(value, 10));
}

const DEFAULT_COLOR = 'hsl(60, 100%, 50%)';

const controlColor = document.querySelector('#input-color');
const controlLineWidth = document.querySelector('#input-line-width');
const clearBtn = document.querySelector('#clear');
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

let isRandomColor = true;
let isRandomLine = true;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let direction = true; // 判斷粗細增減用
let [hue, saturation, lightness] = parseHue(DEFAULT_COLOR);

const initCanvas = () => {
  ctx.strokeStyle = DEFAULT_COLOR; // 預設黃色
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = 1; // 線條寬度
};

initCanvas();

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

controlColor.addEventListener('change', function () {
  ctx.strokeStyle = this.value;
  isRandomColor = false;
});

controlLineWidth.addEventListener('change', function () {
  ctx.lineWidth = this.value;
  isRandomLine = false;
});

clearBtn.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));


function draw(e) {
  if (!isDrawing) return;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  // change random color
  if (isRandomColor) {
    hue += 1;
    ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    if (hue > 360) {
      hue = 0;
    }
  }
  if (isRandomLine) {
    if (direction) {
      ctx.lineWidth += 1;
    } else {
      ctx.lineWidth -= 1;
    }
    if (ctx.lineWidth > 30 || ctx.lineWidth <= 1) {
      direction = !direction;
    }
  }
}


function parseHue(colorStr) {
  const color = colorStr.match(/[0-9]+,?/g); // match number exclude '%'
  return color.map(value => parseInt(value, 10));
}

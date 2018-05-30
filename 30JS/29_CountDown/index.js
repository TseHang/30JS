const today = new Date();
const $pDate = document.querySelector('.date');
const $min = document.querySelector('.min');
const $sec = document.querySelector('.sec');

const $btn1 = document.querySelector('.btn1');
const $btn2 = document.querySelector('.btn2');
const $btnStart = document.querySelector('.btn_start');
const $btnStop = document.querySelector('.btn_stop');

let timer;
let setTime = 0;

const monthNames = [
  'January', 'February', 'March',
  'April', 'May', 'June', 'July',
  'August', 'September', 'October',
  'November', 'December',
];

const setTimeCountDown = secs => () => {
  const array = transform(secs);
  const timeString = array.map((el) => {
    if (el.toString().length < 2) return `0${el}`;
    return el.toString();
  });

  $sec.textContent = timeString[0];
  $min.textContent = timeString[1];
  setTime = secs;
  console.log(setTime, secs);
};

$pDate.textContent = formatDate(today, '');
$btn1.addEventListener('click', setTimeCountDown(20));
$btn2.addEventListener('click', setTimeCountDown(60 * 5));
$btnStart.addEventListener('click', start);
$btnStop.addEventListener('click', stop);


function start() {
  timer = setTimeout(countDown, 1000);
}

function stop() {
  clearTimeout(timer);
}

function countDown() {
  setTime -= 1;
  setTimeCountDown(setTime)();
  start();
}

function transform(secs) {
  if (secs <= 0) return ['00', '00', '00'];

  let time = secs;
  const sec = time % 60;

  time = Math.floor(time / 60);
  const min = time % 60;

  time = Math.floor(time / 60);
  const hour = Math.floor(time / 60);

  return [sec, min, hour];
}


function formatDate(date, format = '') {
  const result = /Y{1,4}-M{1,2}-D{1,2}/.exec(format);
  const day = date.getDate();
  const monthIdx = date.getMonth();
  const year = date.getFullYear();

  const hour = date.getHours();
  const min = date.getMinutes();

  if (!result) return `${hour}:${min}, ${day} ${monthNames[monthIdx]}, ${year}`;

  switch (result[0]) {
    case 'YYYY-MM-DD':
      return `${year}-${monthIdx + 1}-${day} ${hour}:${min}`;
    default:
      return `${hour}:${min}, ${day} ${monthNames[monthIdx]}, ${year}`;
  }
}

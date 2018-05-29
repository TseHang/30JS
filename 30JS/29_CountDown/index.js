const today = new Date();
const $p_date = document.querySelector('.date');
const $min = document.querySelector('.min');
const $sec = document.querySelector('.sec');

const $btn1 = document.querySelector('.btn1');
const $btn2 = document.querySelector('.btn2');

const monthNames = [
  'January', 'February', 'March',
  'April', 'May', 'June', 'July',
  'August', 'September', 'October',
  'November', 'December',
];

const countDown = (secs) => {
  let time = secs;
  const sec = time % 60;

  time = Math.floor(time / 60);
  const min = time % 60;

  time = Math.floor(time / 60);
  const hour = Math.floor(time / 60);

  const array = [sec, min, hour].map((el) => {
    if (el.toString().length < 2) return `0${el}`;
    return el.toString();
  });
  console.log(array);
};

$p_date.textContent = formatDate(today, '');

$btn1.addEventListener('click', countDown(5));
$btn2.addEventListener('click', countDown(60 * 5));

function formatDate(date, format) {
  // Todo: test format like moment
  console.log(format);
  const day = date.getDate();
  const monthIdx = date.getMonth();
  const year = date.getFullYear();

  const hour = date.getHours();
  const min = date.getMinutes();

  return `${hour}:${min}, ${day} ${monthNames[monthIdx]}, ${year} `;
}

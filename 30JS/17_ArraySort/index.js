// 原始資料陣列
const bands = [
  'The Plot in You',
  'The Devil Wears Prada',
  'Pierce the Veil',
  'Norma Jean',
  'The Bled',
  'Say Anything',
  'The Midway State',
  'We Came as Romans',
  'Counterparts',
  'Oh, Sleeper',
  'A Skylit Drive',
  'Anywhere But Here',
  'An Old Dog',
];

function strip(str) {
  return str.replace(/(the |a |An |oh, )/i, '').trim();
}
const sortBands = bands.sort((a, b) => strip(a) > strip(b));

document.querySelector('.container').innerHTML = sortBands.map(band => `<li>${band}</li>`).join('');


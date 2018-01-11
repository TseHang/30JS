'use strict';

// 原始資料陣列
var bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

function strip(str) {
  return str.replace(/(the |a |An |oh, )/i, '').trim();
}
var sortBands = bands.sort(function (a, b) {
  return strip(a) > strip(b);
});

document.querySelector('.container').innerHTML = sortBands.map(function (band) {
  return '<li>' + band + '</li>';
}).join('');
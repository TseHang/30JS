'use strict';

fetch('./data.json').then(function (response) {
  return response.json();
}).then(function (data) {
  /*
    篩選出於1500~1599年間出生的inventor(year in 1500-1599)
    將inventors內的first與last組合成一個陣列
    依據生日由大至小排序所有的inventor
    加總所有inventor的在世時間
    依據年齡由大至小排序所有的inventor
    列出wiki中巴黎所有包含’de’的路名(在wiki中透過querySelectorAll來選取資料作篩選)
    依據lastName排序所有people的資料
    分別計算data內每個種類的數量
  */

  var inventors = data.inventors,
      people = data.people;

  var filters = inventors.filter(function (inventor) {
    return inventor.year >= 1500 && inventor.year < 1600;
  });
  var merge = inventors.map(function (inventor) {
    return inventor.first + ' ' + inventor.last;
  });
  var sortByBirth = inventors.sort(function (a, b) {
    return a.year - b.year;
  }); // ascending
  var totalYears = inventors.reduce(function (acc, value) {
    return acc + (value.passed - value.year);
  }, 0);
  var sortByLife = inventors.sort(function (a, b) {
    return b.passed - b.year - (a.passed - a.year);
  }); // descending

  console.log(filters, merge, sortByBirth, totalYears, sortByLife);
});
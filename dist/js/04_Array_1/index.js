'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

fetch('./data.json').then(function (response) {
  return response.json();
}).then(function (data) {
  /*
    1. 篩選出於1500~1599年間出生的inventor(year in 1500-1599)
    2. 將inventors內的first與last組合成一個陣列
    3. 依據生日由大至小排序所有的inventor
    4. 加總所有inventor的在世時間
    5. 依據年齡由大至小排序所有的inventor
    6. 列出wiki中巴黎所有包含’de’的路名(在wiki中透過querySelectorAll來選取資料作篩選)
    7. 依據lastName排序所有people的資料
    8. 分別計算data內每個種類的數量
  */

  var inventors = data.inventors,
      people = data.people;

  // 1. 篩選出於1500~1599年間出生的inventor(year in 1500-1599)

  var filters = inventors.filter(function (inventor) {
    return inventor.year >= 1500 && inventor.year < 1600;
  });

  // 2. 將inventors內的first與last組合成一個陣列
  var merge = inventors.map(function (inventor) {
    return inventor.first + ' ' + inventor.last;
  });

  // 3. 依據生日由大至小排序所有的inventor
  var sortByBirth = inventors.sort(function (a, b) {
    return a.year - b.year;
  }); // ascending

  // 4. 加總所有inventor的在世時間
  var totalYears = inventors.reduce(function (acc, value) {
    return acc + (value.passed - value.year);
  }, 0);

  // 5. 依據年齡由大至小排序所有的inventor
  var sortByLife = inventors.sort(function (a, b) {
    return b.passed - b.year - (a.passed - a.year);
  }); // descending

  // No.6 列出wiki中巴黎所有包含’de’的路名
  // const category = document.querySelector('.mw-category');
  // const links = Array.from(category.querySelectorAll('a'));
  // const de = links
  //   .map(link => link.textContent)
  //   .filter(streetName => streetName.includes('de'));

  // 7. 依據lastName排序所有people的資料
  var alpha = people.sort(function (cur, next) {
    var _cur$split = cur.split(', '),
        _cur$split2 = _slicedToArray(_cur$split, 2),
        aLast = _cur$split2[0],
        aFirst = _cur$split2[1];

    var _next$split = next.split(', '),
        _next$split2 = _slicedToArray(_next$split, 2),
        bLast = _next$split2[0],
        bFirst = _next$split2[1];

    return aLast > bLast;
  });

  // 8. 分別計算data內每個種類的數量
  // 超強寫法，用 reduce, 寫出 array.uniq 然後'加總'的做法
  var dataAry = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck', 'pogostick'];
  var reduceNum = dataAry.reduce(function (obj, item) {
    var answer = obj;
    if (!answer[item]) {
      answer[item] = 0;
    }
    answer[item] += 1;
    return answer;
  }, {});

  // 題目：試著將統計people的所有單字拆開，並統計各英文字共出現次數(僅包含英文字)
  var strCnt = people.reduce(function (acc, cur) {
    var words = cur.match(/[a-zA-Z]/g, '');
    words.forEach(function (value) {
      if (!acc[value]) {
        acc[value] = 0;
      }
      acc[value] += 1;
    });
    return acc;
  }, {});

  console.log(filters, merge, sortByBirth, totalYears, sortByLife, alpha, reduceNum, strCnt);
});
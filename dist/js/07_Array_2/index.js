'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

fetch('./data.json').then(function (response) {
  return response.json();
}).then(function (data) {
  /*
    1. People是否有19歲以上的人
    2. People是否每個人都19歲以上
    3. 在comments中找到id是823423的資料
    4. 在comments中找到id是823423的資料索引值, 並透過索引值刪除這筆資料
  */

  var people = data.people,
      comments = data.comments;

  var todayYear = new Date().getFullYear();
  // 1. People是否有19歲以上的人
  var is19agesOld = people.some(function (value) {
    return todayYear - value.year > 19;
  });
  // 2. People是否每個人都19歲以上
  var is19agesOldEvery = people.every(function (value) {
    return todayYear - value.year > 19;
  });
  // 3. 在 comments 中找到 id 是 823423 的資料
  var id823423 = comments.find(function (value) {
    return value.id === 823423;
  });
  // 4. 在comments中找到id是823423的資料索引值, 並透過索引值刪除這筆資料
  var id823423Index = comments.findIndex(function (value) {
    return value.id === 823423;
  });
  // const deleteItems = comments.splice(id823423Index, 1);
  var newComments = [].concat(_toConsumableArray(comments.slice(0, id823423Index)), _toConsumableArray(comments.slice(id823423Index + 1)));

  console.log(people, comments, is19agesOld, is19agesOldEvery, id823423, newComments);
});
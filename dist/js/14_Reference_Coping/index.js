'use strict';

var _console;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var arr = [1, 2, 3];
var arr2 = [].concat(arr);
var arr3 = JSON.parse(JSON.stringify(arr));
arr[0] = 123;
arr3[2] = 1233456;

var obj = [{
  is: true,
  no: false
}, {
  1: 2
}];

var obj2 = [].concat(obj);
var obj3 = JSON.parse(JSON.stringify(obj));
obj2[1]['1'] = 3;
obj3[0].is = false;

console.log('陣列型別', typeof arr === 'undefined' ? 'undefined' : _typeof(arr));
console.log(arr, arr2, arr3);
console.log(obj, obj3);
(_console = console).log.apply(_console, _toConsumableArray(obj2));
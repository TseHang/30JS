const arr = [1, 2, 3];
const arr2 = [...arr];
const arr3 = JSON.parse(JSON.stringify(arr));
arr[0] = 123;
arr3[2] = 1233456;


const obj = [{
  is: true,
  no: false,
}, {
  1: 2,
}];

const obj2 = [...obj];
const obj3 = JSON.parse(JSON.stringify(obj));
obj2[1]['1'] = 3;
obj3[0].is = false;


console.log('陣列型別', typeof arr);
console.log(arr, arr2, arr3);
console.log(obj, obj3);
console.log(...obj2);

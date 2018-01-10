'use strict';

var addItems = document.querySelector('.add-items');
var itemsList = document.querySelector('.plates');
var btnCheckAll = document.querySelector('.checkAll');
var items = JSON.parse(localStorage.getItem('items')) || [];

populateList(items);
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDown);
btnCheckAll.addEventListener('click', checkAll);

function addItem(e) {
  e.preventDefault();
  var text = this.querySelector('[name=item]').value;
  var item = {
    text: text,
    done: false
  };

  items.push(item);
  populateList(items);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

function populateList() {
  var plates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  itemsList.innerHTML = plates.map(function (value, index) {
    return '\n    <li>\n      <input type="checkbox" id="item' + index + '" ' + (value.done ? 'checked' : '') + '>\n      <label for="item' + index + '" data-index="' + index + '" >' + value.text + '</label>\n    </li>  \n  ';
  }).join('');
}

function toggleDown(e) {
  var el = e.target;
  var i = el.dataset.index;
  var save = false;
  if (e.target.matches('label')) {
    items[i].done = !items[i].done;
    save = true;
  }

  if (save) {
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items);
  }
}

function checkAll() {
  var inputs = document.querySelectorAll('.plates input');
  if (this.checked) {
    inputs.forEach(function (input) {
      return input.setAttribute('checked', true);
    });
  } else {
    inputs.forEach(function (input) {
      return input.removeAttribute('checked');
    });
  }
}
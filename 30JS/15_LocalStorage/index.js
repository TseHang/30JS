const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const btnCheckAll = document.querySelector('.checkAll');
const items = JSON.parse(localStorage.getItem('items')) || [];

populateList(items);
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDown);
btnCheckAll.addEventListener('click', checkAll);

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector('[name=item]').value;
  const item = {
    text,
    done: false,
  };

  items.push(item);
  populateList(items);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

function populateList(plates = []) {
  itemsList.innerHTML = plates.map((value, index) => `
    <li>
      <input type="checkbox" id="item${index}" ${value.done ? 'checked' : ''}>
      <label for="item${index}" data-index="${index}" >${value.text}</label>
    </li>  
  `).join('');
}

function toggleDown(e) {
  const el = e.target;
  const i = el.dataset.index;
  let save = false;
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
  const inputs = document.querySelectorAll('.plates input');
  if (this.checked) {
    inputs.forEach(input => input.setAttribute('checked', true));
  } else {
    inputs.forEach(input => input.removeAttribute('checked'));
  }
}
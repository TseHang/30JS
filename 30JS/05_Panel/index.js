const panels = document.querySelectorAll('.panel')

panels.forEach(panel => panel.addEventListener('click', activeOpen));

function activeOpen() {
  this.classList.toggle('open');
}

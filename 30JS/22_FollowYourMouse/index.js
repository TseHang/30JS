const triggers = document.querySelectorAll('a');
const highlight = document.createElement('span');

highlight.classList.add('highlight');
document.body.append(highlight);

function highlightLink() {
  const linkCoords = this.getBoundingClientRect();

  const cords = {
    left: linkCoords.x + window.scrollX,
    top: linkCoords.y + window.scrollY,
    width: linkCoords.width,
    height: linkCoords.height,
  };

  highlight.style.width = `${cords.width}px`;
  highlight.style.height = `${cords.height}px`;
  highlight.style.transform = `translate(${cords.left}px, ${cords.top}px)`;
}

triggers.forEach(val => val.addEventListener('mouseenter', highlightLink));

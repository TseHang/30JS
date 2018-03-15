const dropdownBg = document.querySelector('.dropdown-background');
const triggers = document.querySelectorAll('.cool > li');

triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));

function handleEnter() {
  this.classList.add('trigger-enter');
  setTimeout(() => this.classList.add('trigger-enter-active'), 150);
  dropdownBg.classList.add('open');

  const dropdown = this.querySelector('.dropdown');
  const dropdownCords = dropdown.getBoundingClientRect();

  dropdownBg.style.setProperty('transform', `translate(${dropdownCords.x}px, ${dropdownCords.y}px)`);
  dropdownBg.style.setProperty('width', `${dropdownCords.width}px`);
  dropdownBg.style.setProperty('height', `${dropdownCords.height}px`);
}

function handleLeave() {
  this.classList.remove('trigger-enter', 'trigger-enter-active');
  dropdownBg.classList.remove('open');
}

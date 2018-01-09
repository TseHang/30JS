const proceed = [];
const secret = 'hang';
window.addEventListener('keydown', (e) => {
  const value = e.key;
  proceed.push(value);
  const arrCut = proceed.slice(-secret.length);
  const input = document.querySelector('#input');

  input.textContent = arrCut.join('-');
  if (arrCut.join('').includes(secret)) {
    setTimeout(() => alert('Yo, you\'re bingo! '), 0); // delay 一下，讓畫面 input 先出現
  }
});

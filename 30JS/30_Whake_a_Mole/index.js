const btnStart = document.querySelector('.btn.start');
const btnStop = document.querySelector('.btn.stop');

class Game {
  constructor(index) {
    this.score = 0;
    this.gameStart = false;
    this.counts = index;
    this.timer = 0;
    this.who = 0;
    this.gophers = document.querySelectorAll('.gopher');

    this.init();
  }

  init() {
    this.gophers.forEach(el => el.addEventListener('click', e => this.bomb(e)));
  }

  start() {
    if (this.gameStart) {
      return;
    }
    this.gameStart = true;
    this.timer = setInterval(() => {
      const who = this.getWho();
      this.randomUp(who);
    }, 500);
  }

  stop() {
    this.gameStart = false;
    clearInterval(this.timer);
    this.gophers.forEach(el => el.classList.remove('up'));
  }

  getWho() {
    return Math.floor(Math.random() * this.counts) + 1;
  }

  randomUp(who) {
    if (who === this.who) return;
    this.who = who;

    const gospher = document.querySelector(`.monster${who} > .gopher`);
    const intervalTime = (Math.random() * 2000) + 500;
    gospher.classList.add('up');
    setTimeout(() => this.down(gospher), intervalTime);
  }

  down(gospher) {
    gospher.classList.remove('up');
  }

  bomb(e) {
    e.target.classList.remove('up');
    this.score += 1;
    setScore(this.score);
  }
}

function setScore(score) {
  const $score = document.querySelector('.score');
  $score.textContent = score;
}

const game = new Game(9);

btnStart.addEventListener('click', () => game.start());
btnStop.addEventListener('click', () => game.stop());

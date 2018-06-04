'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var btnStart = document.querySelector('.btn.start');
var btnStop = document.querySelector('.btn.stop');

var Game = function () {
  function Game(index) {
    _classCallCheck(this, Game);

    this.score = 0;
    this.gameStart = false;
    this.counts = index;
    this.timer = 0;
    this.who = 0;
    this.gophers = document.querySelectorAll('.gopher');

    this.init();
  }

  _createClass(Game, [{
    key: 'init',
    value: function init() {
      var _this = this;

      this.gophers.forEach(function (el) {
        return el.addEventListener('click', function (e) {
          return _this.bomb(e);
        });
      });
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      if (this.gameStart) {
        return;
      }
      this.gameStart = true;
      this.timer = setInterval(function () {
        var who = _this2.getWho();
        _this2.randomUp(who);
      }, 500);
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.gameStart = false;
      clearInterval(this.timer);
      this.gophers.forEach(function (el) {
        return el.classList.remove('up');
      });
    }
  }, {
    key: 'getWho',
    value: function getWho() {
      return Math.floor(Math.random() * this.counts) + 1;
    }
  }, {
    key: 'randomUp',
    value: function randomUp(who) {
      var _this3 = this;

      if (who === this.who) return;
      this.who = who;

      var gospher = document.querySelector('.monster' + who + ' > .gopher');
      var intervalTime = Math.random() * 2000 + 500;
      gospher.classList.add('up');
      setTimeout(function () {
        return _this3.down(gospher);
      }, intervalTime);
    }
  }, {
    key: 'down',
    value: function down(gospher) {
      gospher.classList.remove('up');
    }
  }, {
    key: 'bomb',
    value: function bomb(e) {
      e.target.classList.remove('up');
      this.score += 1;
      setScore(this.score);
    }
  }]);

  return Game;
}();

function setScore(score) {
  var $score = document.querySelector('.score');
  $score.textContent = score;
}

var game = new Game(9);

btnStart.addEventListener('click', function () {
  return game.start();
});
btnStop.addEventListener('click', function () {
  return game.stop();
});
const handSecond = document.querySelector('.second-hand');
const handMin = document.querySelector('.min-hand');
const handHour = document.querySelector('.hour-hand');

const update = () => {
  const now = new Date();
  const secondDegree = transformSeconds(now.getSeconds());
  const minDegree = transformMins(now.getMinutes());
  const hourDegree = transformHours(now.getHours(), now.getMinutes());

  handSecond.style.transform = `rotate(${-90 + secondDegree}deg)`;
  handMin.style.transform = `rotate(${-90 + minDegree}deg)`;
  handHour.style.transform = `rotate(${-90 + hourDegree}deg)`;
  console.log(123);

  function transformSeconds(seconds) {
    return (360 / 60) * seconds;
  }

  function transformMins(mins) {
    return (360 / 60) * mins;
  }

  function transformHours(hours, mins) {
    return (360 / 12) * hours + (30 / 60) * mins;
  }
};


window.setInterval(update, 1000);

// console.log(now.getSeconds());
// console.log(now.getHours());
// console.log(now.getMinutes());

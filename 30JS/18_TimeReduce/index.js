const videos = document.querySelectorAll('[data-time]');
const timeArray = Array.from(videos).map(video => video.dataset.time);
const totalTime = timeArray.reduce((acc, cur) => {
  let [carryHour, carryMin] = [0, 0];
  const time = transformTime(cur);
  const [hour, min, sec] = time.map((val, i) => {
    const total = val + acc[i];
    switch (i) {
      case 0: // hour
        return total;
      case 1: // min
        if (total > 60) {
          carryHour += Math.floor(total / 60);
          return total % 60;
        }
        return total;
      case 2: // sec
        if (total > 60) {
          carryMin += Math.floor(total / 60);
          return total % 60;
        }
        return total;
      default:
        break;
    }
  });

  return [hour + carryHour, min + carryMin, sec];
}, [0, 0, 0]);

console.log(totalTime);

function transformTime(str) {
  const time = str.split(':').map(value => parseInt(value, 10));
  if (time.length !== 3) {
    time.splice(0, 0, 0); // Add hour = 0
  }
  return time;
}

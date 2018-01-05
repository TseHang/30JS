const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const FETCH = window.fetch ? 1 : 0;

const fetchData = async () => {
  const response = await fetch(endpoint);
  const cities = await response.json();
  return cities;
};

if (FETCH) {
  fetchData()
    .then(cities => typeSort(cities));
}

const findMatches = (word, cities) => cities.filter((place) => {
  const regex = new RegExp(word, 'gi');
  return place.city.match(regex) || place.state.match(regex);
});

function typeSort(cities) {
  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('change', showMatches); // 在游標離開，就是每 focus 一次跑一次 -> event
  searchInput.addEventListener('keyup', showMatches); // 每在 input 裡面按一個 keyPress 就會呼叫 -> keyBoardEvent

  function showMatches(event) {
    const isChange = event.type === 'change'; // 判斷是否為 change 事件（一次 focus）
    const search = this.value;
    const matchArray = findMatches(search, cities);
    const html = matchArray.map((place) => {
      if (!isChange) {
        const regexp = new RegExp(search, 'gi');
        const cityName = place.city.replace(regexp, `<span class="highlight">${search}</span>`)
        const stateName = place.state.replace(regexp, `<span class="highlight">${search}</span>`)
        return `<li>${cityName},  ${stateName}</li>`;
      }
      return `<li>${place.city},  ${place.state}</li>`;
    }).sort().join('');

    suggestions.innerHTML = html;
  }
}

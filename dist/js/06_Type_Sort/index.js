'use strict';

var endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
var FETCH = window.fetch ? 1 : 0;

var fetchData = async function fetchData() {
  var response = await fetch(endpoint);
  var cities = await response.json();
  return cities;
};

if (FETCH) {
  fetchData().then(function (cities) {
    return typeSort(cities);
  });
}

function typeSort(cities) {
  var searchInput = document.querySelector('.search');
  var suggestions = document.querySelector('.suggestions');
  searchInput.addEventListener('change', showMatches); // 在游標離開，就是每 focus 一次跑一次 -> event
  searchInput.addEventListener('keyup', showMatches); // 每在 input 裡面按一個 keyPress 就會呼叫 -> keyBoardEvent

  function showMatches(event) {
    // console.log(cities);
    var matchArray = findMatches(this.value, cities);
    // const html = matchArray.map((place) => {
    //   return '';
    // });
    suggestions.innerHTML = '';
    console.log(matchArray);
  }
}

function findMatches(word, cities) {
  return cities.filter(function (place) {
    var regex = new RegExp(word, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}
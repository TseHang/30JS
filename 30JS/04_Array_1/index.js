fetch('./data.json')
  .then(response => response.json())
  .then((data) => {
    /*
      篩選出於1500~1599年間出生的inventor(year in 1500-1599)
      將inventors內的first與last組合成一個陣列
      依據生日由大至小排序所有的inventor
      加總所有inventor的在世時間
      依據年齡由大至小排序所有的inventor
      列出wiki中巴黎所有包含’de’的路名(在wiki中透過querySelectorAll來選取資料作篩選)
      依據lastName排序所有people的資料
      分別計算data內每個種類的數量
    */

    const { inventors, people } = data;
    const filters = inventors.filter(inventor => inventor.year >= 1500 && inventor.year < 1600);
    const merge = inventors.map(inventor => `${inventor.first} ${inventor.last}`);
    const sortByBirth = inventors.sort((a, b) => a.year - b.year); // ascending
    const totalYears = inventors.reduce((acc, value) => acc + (value.passed - value.year), 0);
    const sortByLife = inventors.sort((a, b) => (b.passed - b.year) - (a.passed - a.year)); // descending

    console.log(filters, merge, sortByBirth, totalYears, sortByLife);
  });

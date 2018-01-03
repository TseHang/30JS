fetch('./data.json')
  .then(response => response.json())
  .then((data) => {
    /*
      1. 篩選出於1500~1599年間出生的inventor(year in 1500-1599)
      2. 將inventors內的first與last組合成一個陣列
      3. 依據生日由大至小排序所有的inventor
      4. 加總所有inventor的在世時間
      5. 依據年齡由大至小排序所有的inventor
      6. 列出wiki中巴黎所有包含’de’的路名(在wiki中透過querySelectorAll來選取資料作篩選)
      7. 依據lastName排序所有people的資料
      8. 分別計算data內每個種類的數量
    */

    const { inventors, people } = data;

    // 1. 篩選出於1500~1599年間出生的inventor(year in 1500-1599)
    const filters = inventors.filter(inventor => inventor.year >= 1500 && inventor.year < 1600);

    // 2. 將inventors內的first與last組合成一個陣列
    const merge = inventors.map(inventor => `${inventor.first} ${inventor.last}`);
    
    // 3. 依據生日由大至小排序所有的inventor
    const sortByBirth = inventors.sort((a, b) => a.year - b.year); // ascending
    
    // 4. 加總所有inventor的在世時間
    const totalYears = inventors.reduce((acc, value) => acc + (value.passed - value.year), 0);
    
    // 5. 依據年齡由大至小排序所有的inventor
    const sortByLife = inventors.sort((a, b) => (b.passed - b.year) - (a.passed - a.year)); // descending

    // No.6 列出wiki中巴黎所有包含’de’的路名
    // const category = document.querySelector('.mw-category');
    // const links = Array.from(category.querySelectorAll('a'));
    // const de = links
    //   .map(link => link.textContent)
    //   .filter(streetName => streetName.includes('de'));

    // 7. 依據lastName排序所有people的資料
    const alpha = people.sort((cur, next) => {
      const [aLast, aFirst] = cur.split(', ');
      const [bLast, bFirst] = next.split(', ');
      return aLast > bLast;
    });

    // 8. 分別計算data內每個種類的數量
    // 超強寫法，用 reduce, 寫出 array.uniq 然後'加總'的做法
    const dataAry = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck', 'pogostick'];
    const reduceNum = dataAry.reduce((answerObj, item) => {
      if (!answerObj[item]) {
        answerObj[item] = 0;
      }
      answerObj[item] += 1;
      return answerObj;
    }, {});


    // 題目：試著將統計people的所有單字拆開，並統計各英文字共出現次數(僅包含英文字)
    const strCnt = people.reduce((acc, cur) => {
      const words = cur.match(/[a-zA-Z]/g, '');
      words.forEach((value) => {
        if (!acc[value]) {
          acc[value] = 0;
        }
        acc[value] += 1;
      });
      return acc;
    }, {});

    console.log(filters, merge, sortByBirth, totalYears, sortByLife, alpha, reduceNum, strCnt);
  });

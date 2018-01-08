fetch('./data.json')
  .then(response => response.json())
  .then((data) => {
    /*
      1. People是否有19歲以上的人
      2. People是否每個人都19歲以上
      3. 在comments中找到id是823423的資料
      4. 在comments中找到id是823423的資料索引值, 並透過索引值刪除這筆資料
    */

    const { people, comments } = data;
    const todayYear = new Date().getFullYear();
    // 1. People是否有19歲以上的人
    const is19agesOld = people.some(value => todayYear - value.year > 19);
    // 2. People是否每個人都19歲以上
    const is19agesOldEvery = people.every(value => todayYear - value.year > 19);
    // 3. 在 comments 中找到 id 是 823423 的資料
    const id823423 = comments.find(value => value.id === 823423)
    // 4. 在comments中找到id是823423的資料索引值, 並透過索引值刪除這筆資料
    const id823423Index = comments.findIndex(value => value.id === 823423);
    // const deleteItems = comments.splice(id823423Index, 1);
    const newComments = [...comments.slice(0, id823423Index), ...comments.slice(id823423Index + 1)]

    console.log(people, comments, is19agesOld, is19agesOldEvery, id823423, newComments);
    
  });

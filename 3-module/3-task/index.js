function camelize(str) {
  let arrPropCamel = str.split(`-`).map((word, index) => {
    let upperWord = ``;
    if (index > 0 && word.length > 0) {
      upperWord = word[0].toUpperCase();
      for (let i = 1; word.length > i; i++) {
        upperWord += word[i];
      }
    } else {
      upperWord = word;
    } 
    return upperWord;
  });
  return arrPropCamel.join(``);
}
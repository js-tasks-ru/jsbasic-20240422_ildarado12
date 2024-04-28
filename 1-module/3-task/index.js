function ucFirst(str) {
  if (str.length == 0) {
    return upperStr = ``;
  } else {
    let upperStr = str[0].toUpperCase();
    for (let i = 1; str.length > i; i++) {
      upperStr = upperStr + str[i]; 
    }
    return upperStr;
  }
}

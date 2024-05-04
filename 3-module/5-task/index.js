function getMinMax(str) {
  let arrNum = str.split(` `).filter(item => {
    let num = Number(item);
    if (Number.isFinite(num)) return num;
  });
  let objNum = {
    min: Math.min(...arrNum),
    max: Math.max(...arrNum),
  };
  return objNum;
}
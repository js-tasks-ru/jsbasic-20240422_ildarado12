function factorial(n) {
  if (n < 0) {
    alert(`Введите положительное число или ноль.`);
    return;
  } if (n > 1) {
    let i = n; 
    while (i > 1) {
      n *= (i - 1);
      --i;
    }
  } else {
    n = 1;
  }
  return n;
}
alert(factorial(1));
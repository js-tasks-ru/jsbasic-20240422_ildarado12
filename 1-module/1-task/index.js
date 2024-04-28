function factorial(n) {
  if (n < 0) {
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
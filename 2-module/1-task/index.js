function sumSalary(salaries) {
  let sal = 0;
  for (let key in salaries) {
    if (typeof salaries[key] === `number` && isFinite(salaries[key])) {
      sal += salaries[key];
    }
  }
  return sal;
}

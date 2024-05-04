function showSalary(users, age) {
  let usersAge = users.filter(user => user.age <= age);
  let arrUsers = usersAge.map(user => `${user.name}, ${user.balance}`);
  return arrUsers.join(`\n`);
}
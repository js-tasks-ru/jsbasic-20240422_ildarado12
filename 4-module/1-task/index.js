function makeFriendsList(friends) {
  let friendsUl = document.createElement(`UL`);
  for (let friend of friends) {
    let friendsLi = document.createElement(`LI`);
    friendsLi.textContent = `${friend.firstName} ${friend.lastName}`;
    friendsUl.insertAdjacentElement(`beforeend`, friendsLi);
  }
  return friendsUl;
}
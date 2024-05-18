function hideSelf() {
  let hsb = document.querySelector(`.hide-self-button`);
  hsb.onclick = function() {
    hsb.hidden = true;
  };
}

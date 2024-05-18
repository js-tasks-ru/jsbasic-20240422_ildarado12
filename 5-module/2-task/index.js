function toggleText() {
  let tt = document.querySelector(`.toggle-text-button`);
  tt.addEventListener(`click`, () => {
    text.hidden = !text.hidden;
  });
}

import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (!this.elem.offsetWidth) {
      return;
    }
    const containerElem = document.body.querySelector(`.container`);
    const marginContainerElem = (document.documentElement.clientWidth - containerElem.offsetWidth) / 2;

    if (window.scrollY > 50 && document.documentElement.clientWidth > 767) {
      this.elem.style.position = `fixed`;
      this.elem.style.zIndex = 1000;
      if (marginContainerElem < 30 + this.elem.offsetWidth) {
        this.elem.style.left = Math.min(
          document.querySelector('.container').getBoundingClientRect().right + 20,
          document.documentElement.clientWidth - this.elem.offsetWidth - 10
        ) + 'px';
      } else {
        this.elem.style.left = marginContainerElem + containerElem.offsetWidth + 20 + `px`;
      }
    } else {
      this.elem.style = 0;
    }
    return this.elem;
  }
}
import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.innerRibbon();
    this.customEvent();
  }

  render() {
    this.elem = createElement(`
    <div class="ribbon">
    <!--Кнопка прокрутки влево-->
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <!--Ссылки на категории-->
    <nav class="ribbon__inner">
    </nav>

    <!--Кнопка прокрутки вправо-->
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    </div>
    `);

    this.inner = this.elem.querySelector(`.ribbon__inner`);

    for (let cat of this.categories) {
      if (cat.id == ``) {
        this.cat = createElement(`
        <a href="#" class="ribbon__item ribbon__item_active" data-id="">${cat.name}</a>
        `);
      } else {
        this.cat = createElement(`
          <a href="#" class="ribbon__item" data-id="${cat.id}">${cat.name}</a>
        `);
      }
      this.inner.append(this.cat);
    }
    return this.elem;
  }

  innerRibbon() {
    let ribbonArrowRight = this.elem.querySelector(`.ribbon__arrow_right`);
    let ribbonArrowLeft = this.elem.querySelector(`.ribbon__arrow_left`);
    let ribbonInner = this.elem.querySelector(`.ribbon__inner`);

    ribbonArrowRight.addEventListener(`click`, () => {
      ribbonInner.scrollBy(350, 0);
    });

    ribbonArrowLeft.addEventListener(`click`, () => {
      ribbonInner.scrollBy(-350, 0);
    });

    ribbonInner.addEventListener(`scroll`, () => {
      let scrollLeft = ribbonInner.scrollLeft;
      if (scrollLeft == 0) {
        ribbonArrowLeft.classList.remove(`ribbon__arrow_visible`);
      } else {
        ribbonArrowLeft.classList.add(`ribbon__arrow_visible`);
      }

      let scrollWidth = ribbonInner.scrollWidth;
      let clientWidth = ribbonInner.clientWidth;
      if ((scrollWidth - scrollLeft - clientWidth) < 1) {
        ribbonArrowRight.classList.remove(`ribbon__arrow_visible`);
      } else {
        ribbonArrowRight.classList.add(`ribbon__arrow_visible`);
      }
    });
  }

  customEvent() {
    let ribbonInner = this.elem.querySelector(`.ribbon__inner`);
    ribbonInner.addEventListener(`ribbon-select`, ev => {

      let preCategories = ribbonInner.querySelector(`.ribbon__item_active`);
      let nextCategories = ribbonInner.querySelector(`[data-id="${ev.detail}"]`);

      if (preCategories) {
        preCategories.classList.remove(`ribbon__item_active`);
      }

      if (nextCategories || nextCategories == null) {
        nextCategories.classList.add(`ribbon__item_active`);
      }

    });
    ribbonInner.addEventListener(`click`, ev => {
      ev.preventDefault();
      let id = ev.target.dataset.id;

      if (id || id == ``) {
        let MyEvent = new CustomEvent(`ribbon-select`, { 
          detail: id,
          bubbles: true,
        });
        ribbonInner.dispatchEvent(MyEvent);
      } else {
        return;
      }
    }
    );
  }
}
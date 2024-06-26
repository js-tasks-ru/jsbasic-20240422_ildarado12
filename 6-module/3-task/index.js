import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
    this.innerCarousel();
    this.customEvent();
  }
  
  render() {
    this.elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
        </dir>
      </div>
    `);

    this.inner = this.elem.querySelector(`.carousel__inner`);

    for (let slid of this.slides) {
      this.slid = createElement(`
      <div class="carousel__slide" data-id="${slid.id}">
        <img src="/assets/images/carousel/${slid.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slid.price.toFixed(2)}</span>
          <div class="carousel__title">${slid.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
      `);
      this.inner.append(this.slid);
    }

    return this.elem;
  }

  innerCarousel() {
    let carouselArrowRight = this.elem.querySelector(`.carousel__arrow_right`);
    let carouselArrowLeft = this.elem.querySelector(`.carousel__arrow_left`);
    let levelCarouselInner = 1;
    carouselArrowLeft.style.display = 'none';
  
    carouselArrowRight.addEventListener(`click`, () => {
      levelCarouselInner += 1;
      this.elem.querySelector(`.carousel__inner`).style.transform = `translateX(-${(levelCarouselInner - 1) * this.elem.querySelector(`.carousel__inner`).offsetWidth}px)`;
      if (levelCarouselInner < this.slides.length) {
        carouselArrowRight.style.display = '';
        carouselArrowLeft.style.display = '';      
      } else {
        carouselArrowRight.style.display = 'none';
      }
    });
  
    carouselArrowLeft.addEventListener(`click`, () => {
      levelCarouselInner -= 1;
      this.elem.querySelector(`.carousel__inner`).style.transform = `translateX(-${(levelCarouselInner - 1) * this.elem.querySelector(`.carousel__inner`).offsetWidth}px)`;
      if (levelCarouselInner <= 1) {
        carouselArrowLeft.style.display = 'none';
      } else {
        carouselArrowLeft.style.display = '';
        carouselArrowRight.style.display = '';
      }
    });
  }

  customEvent() {
    let carouselInner = this.elem.querySelector(`.carousel__inner`);
    carouselInner.addEventListener(`product-add`, ev => {
    });
    carouselInner.addEventListener(`click`, ev => {
      let id = ev.target.closest('[data-id]').dataset.id;
      if (id) {
        let MyEvent = new CustomEvent(`product-add`, { 
          detail: id,
          bubbles: true,
        });
        carouselInner.dispatchEvent(MyEvent);
      } else {
        return;
      }
    }
    );
  }
}



/* let carouselInner = this.elem.querySelector(`.carousel__inner`);
carouselInner.addEventListener(`product-add`, ev => {
});
carouselInner.addEventListener(`click`, ev => {
  let id = ev.target.closest('[data-id]').dataset.id; // Получаем id

  if (id) {
    let MyEvent = new CustomEvent(`product-add`, {
      detail: id,
      bubbles: true,
    });
    this.elem.dispatchEvent(MyEvent); // Dispatch вызываем у корневого элемента
  } else {
    return;
  }
}
); */
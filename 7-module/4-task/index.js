import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;  
    this.render();
    this.dragNdrop();
    this.castomEvent();
  }

  render() {
    this.elem = createElement(`
    <div class="slider">

      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: ${this.value * 100 / (this.steps - 1)}%">
        <span class="slider__value">${this.value}</span>
      </div>

      <!--Полоска слайдера-->
      <div class="slider__progress" style="width: ${this.value * 100 / (this.steps - 1)}%"></div>

      <!-- Шаги слайдера (вертикальные чёрточки) -->
      <div class="slider__steps">
      </div>
    </div>`);

    let sliderSteps = this.elem.querySelector(`.slider__steps`);
    for (let i = 0; i < this.steps; i++) {
      if (i == this.value) {
        sliderSteps.append(createElement(`<span class="slider__step-active"></span>`));
      } else {
        sliderSteps.append(document.createElement(`SPAN`));
      }
    }

    return this.elem;
  }

  dragNdrop() {
    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;

    let onPointerMove = (pointerMoveEvent) => {
      this.elem.classList.add(`slider_dragging`);
      let sliderPageX = this.elem.getBoundingClientRect().x;
      let sliderWidth = this.elem.getBoundingClientRect().width;    
      
      let leftPercents = Math.round((pointerMoveEvent.clientX - sliderPageX) / sliderWidth * 100);

      if (pointerMoveEvent.clientX <= sliderPageX) {
        leftPercents = 0;
      } else {
        if (pointerMoveEvent.clientX >= sliderPageX + sliderWidth) {
          leftPercents = 100;
        }
      }
      
      this.sliderValue = Math.round(leftPercents / 100 * (this.steps - 1));
      let spanValue = this.elem.querySelector(`.slider__value`);
      spanValue.textContent = this.sliderValue;

      let sliderSteps = this.elem.querySelector(`.slider__steps`);
      let arraySpan = Array.from(sliderSteps.childNodes).filter(item => item.nodeName == `SPAN`);

      for (let i = 0; i < arraySpan.length; i++) {
        arraySpan[i].className = ``;
        if (i == this.sliderValue) {
          arraySpan[i].className = `slider__step-active`;          
        }
      }

      let progress = this.elem.querySelector('.slider__progress');

      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;
    };

    this.elem.addEventListener(`click`, (ev) => {
      this.elem.classList.remove(`slider_dragging`);
      let sliderPageX = this.elem.getBoundingClientRect().x;
      let sliderWidth = this.elem.getBoundingClientRect().width; 

      let leftPercents = Math.round((ev.clientX - sliderPageX) / sliderWidth * 100);

      let thumb = this.elem.querySelector('.slider__thumb');
      let progress = this.elem.querySelector('.slider__progress');

      this.sliderValue = Math.round(leftPercents / 100 * (this.steps - 1));
      let spanValue = this.elem.querySelector(`.slider__value`);
      spanValue.textContent = this.sliderValue;

      let sliderSteps = this.elem.querySelector(`.slider__steps`);
      let arraySpan = Array.from(sliderSteps.childNodes).filter(item => item.nodeName == `SPAN`);

      for (let i = 0; i < arraySpan.length; i++) {
        arraySpan[i].className = ``;
        if (i == this.sliderValue) {
          arraySpan[i].className = `slider__step-active`;          
        }
      }

      thumb.style.left = `${this.sliderValue * 100 / (this.steps - 1)}%`;
      progress.style.width = `${this.sliderValue * 100 / (this.steps - 1)}%`;

      this.elem.dispatchEvent(
        new CustomEvent('slider-change', {
          detail: this.sliderValue,
          bubbles: true
        })
      );
    });

    thumb.onpointerdown = () => {
      document.addEventListener(`pointermove`, onPointerMove);

      document.onpointerup = () => {
        this.elem.classList.remove(`slider_dragging`);
        let thumb = this.elem.querySelector('.slider__thumb');
        let progress = this.elem.querySelector('.slider__progress');

        thumb.style.left = `${this.sliderValue * 100 / (this.steps - 1)}%`;
        progress.style.width = `${this.sliderValue * 100 / (this.steps - 1)}%`;

        document.removeEventListener(`pointermove`, onPointerMove);
        document.onpointerup = null;

        this.elem.dispatchEvent(
          new CustomEvent('slider-change', {
            detail: this.sliderValue,
            bubbles: true
          })
        );
      };
    };
  }

  castomEvent() {
    document.body.addEventListener(`slider-change`, function(ev) {
    });

    this.elem.addEventListener(`pointerup`, () => {
      let MyEvent = new CustomEvent('slider-change', {
        detail: this.sliderValue,
        bubbles: true,
      });
      this.elem.dispatchEvent(MyEvent);
    });
  }
}
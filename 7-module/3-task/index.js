import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    this.changeSteps();
    this.castomEvent();
  }

  render() {
    this.elem = createElement(`
    <div class="slider">

      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>

      <!--Полоска слайдера-->
      <div class="slider__progress"></div>

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

  changeSteps() {
    this.elem.addEventListener(`click`, ev => {
      let sliderPageX = this.elem.getBoundingClientRect().x;
      let sliderWidth = this.elem.getBoundingClientRect().width;
      let leftPercents = Math.round((ev.clientX - sliderPageX) / sliderWidth * 100);

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

      let thumb = this.elem.querySelector('.slider__thumb');
      let progress = this.elem.querySelector('.slider__progress');

      let valuePercents = Math.round(this.sliderValue * 100 / (this.steps - 1));
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;
    });
  }

  castomEvent() {
    this.elem.addEventListener(`slider-change`, ev => {
    });

    this.elem.addEventListener(`click`, ev => {
      let MyEvent = new CustomEvent('slider-change', {
        detail: this.sliderValue,
        bubbles: true,
      });
      this.elem.dispatchEvent(MyEvent);
    });
  }
}
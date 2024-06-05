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

  dragNdrop() {
    let thumb = this.elem.querySelector('.slider__thumb');
    let stepsEv = this.steps;

    thumb.onpointerdown = function () {
      thumb.ondragstart = () => false;

      let onPointerMove = (pointerMoveEvent) => {

        console.log(this.elem);
        
        let sliderElem = document.body.querySelector(`.slider`);
        let sliderPageX = sliderElem.getBoundingClientRect().x;
        let sliderWidth = sliderElem.getBoundingClientRect().width;
        sliderElem.classList.add(`slider_dragging`);

        let leftPercents = Math.round((pointerMoveEvent.clientX - sliderPageX) / sliderWidth * 100);

        if (pointerMoveEvent.clientX <= sliderPageX) {
          leftPercents = 0;
        } else {
          if (pointerMoveEvent.clientX >= sliderPageX + sliderWidth) {
            leftPercents = 100;
          }
        }

        this.sliderValue = Math.round(leftPercents / 100 * (stepsEv - 1));
        let spanValue = sliderElem.querySelector(`.slider__value`);
        spanValue.textContent = this.sliderValue;

        let sliderSteps = sliderElem.querySelector(`.slider__steps`);
        let arraySpan = Array.from(sliderSteps.childNodes).filter(item => item.nodeName == `SPAN`);

        for (let i = 0; i < arraySpan.length; i++) {
          arraySpan[i].className = ``;
          if (i == this.sliderValue) {
            arraySpan[i].className = `slider__step-active`;          
          }
        }

        let progress = sliderElem.querySelector('.slider__progress');

        let valuePercents = Math.round(this.sliderValue * 100 / (stepsEv - 1));
        thumb.style.left = `${valuePercents}%`;
        progress.style.width = `${valuePercents}%`;
      };

      document.addEventListener(`pointermove`, onPointerMove);

      document.onpointerup = function () {
        let sliderElem = document.body.querySelector(`.slider`);
        sliderElem.classList.remove(`slider_dragging`);
        document.removeEventListener(`pointermove`, onPointerMove);
        document.onpointerup = null;
      };
    };
  }

  castomEvent() {
    document.body.addEventListener(`slider-change`, ev => {
      //console.log(ev.detail);
    });

    document.body.addEventListener(`click`, ev => {
      let MyEvent = new CustomEvent('slider-change', {
        detail: this.sliderValue,
        bubbles: true,
      });
      document.body.dispatchEvent(MyEvent);
    });
  }
}

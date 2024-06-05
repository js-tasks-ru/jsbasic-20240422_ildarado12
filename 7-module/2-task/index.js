import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = createElement(`
    <div class="modal">
      <!--Прозрачная подложка перекрывающая интерфейс-->
      <div class="modal__overlay"></div>
  
      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
  
          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>
  
        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>
  
    </div>
    `);

    let eventEsc = ev => {
      if (ev.code === 'Escape') {
        this.close();
      }
      ev.preventDefault();
    };
    this.eventEsc = eventEsc;
    this.modalClose();
    this.eventKeyEsc();
  }

  open() {
    document.body.classList.add(`is-modal-open`);

    return document.body.append(this.elem);
  }

  setTitle(title) {
    let modalTitleElem = this.elem.querySelector(`.modal__title`);
    modalTitleElem.textContent = title;
  }

  setBody(domElem) {
    let modalBodyElem = this.elem.querySelector(`.modal__body`);
    modalBodyElem.textContent = ``;
    modalBodyElem.append(domElem);
  }

  close() {
    document.removeEventListener('keydown', this.eventEsc);

    this.elem.remove();

    document.body.classList.remove(`is-modal-open`);
  } 

  modalClose () {
    let modalClose = this.elem.querySelector(`.modal__close`);
    modalClose.addEventListener(`click`, ev => {
      this.close();
    });
  }

  eventKeyEsc() {
    document.addEventListener('keydown', this.eventEsc);
  } 
}
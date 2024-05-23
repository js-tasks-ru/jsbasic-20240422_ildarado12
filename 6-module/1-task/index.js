/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = document.createElement(`TABLE`);
    this.theadElement = document.createElement(`THEAD`);
    this.elem.prepend(this.theadElement);
    this.theadElement.insertAdjacentHTML(`afterbegin`, `<tr>
    <th>Имя</th>
    <th>Возраст</th>
    <th>Зарплата</th>
    <th>Город</th>
    <th></th>
    </tr>`);

    this.tbodyElement = document.createElement(`TBODY`);
    this.elem.append(this.tbodyElement);
    for (let tr of this.rows) {
      this.tbodyElement.insertAdjacentHTML(`beforeend`, `<tr>
      <td>${tr.name}</td>
      <td>${tr.age}</td>
      <td>${tr.salary}</td>
      <td>${tr.city}</td>
      <td><button>X</button></td>
      </tr>`);
    }

    return this.elem;
  }

  addEventListeners() {
    this.elem.addEventListener(`click`, ev => {
      console.log(ev.target.tagName);

      if (ev.target.tagName === `BUTTON`) {
        ev.target.parentElement.parentElement.remove();
      }
    });
  }
}
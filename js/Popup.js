class Popup {
  constructor(container) {
    this.container = container;
  }

  open() {
    this.container.classList.add('popup_is-opened');
  }

  close() {
    this.container.classList.remove('popup_is-opened');
  }

  templatePopup() {
    const templateString = `
      <div class="popup__content">
        <img src="./images/close.svg" alt="" class="popup__close">
        <h3 class="popup__title"></h3>
        <form class="popup__form">
            <input type="text" class="popup__input" required>
            <p class="popup__hint"></p>
            <input type="text" class="popup__input" required>
            <p class="popup__hint"></p>
            <button type="submit" class="button popup__button"></button>
        </form>
      </div>
      `
    const element = document.createElement('div');
    element.insertAdjacentHTML('beforeend', templateString.trim());
    return element.firstChild;
  }

  createAddPopup() {
    const template = this.templatePopup();

    const title = template.querySelector('h3');
    title.textContent = 'Новое место'

    const form = template.querySelector('form');
    form.setAttribute('name', 'new');

    const inputs = template.querySelectorAll('input');

    const firstInput = inputs[0];
    firstInput.classList.add('popup__input_type_name');
    firstInput.setAttribute('name', 'name');
    firstInput.setAttribute('id', 'name');
    firstInput.setAttribute('minlength', '2');
    firstInput.setAttribute('maxlength', '30');
    firstInput.setAttribute('placeholder', 'Название');

    const hints = template.querySelectorAll('.popup__hint')

    const firstHint = hints[0];
    firstHint.setAttribute('id', 'name-hint');

    const secondInput = inputs[1];
    secondInput.classList.add('popup__input_type_link-url');
    secondInput.setAttribute('type', 'url');
    secondInput.setAttribute('name', 'link');
    secondInput.setAttribute('id', 'link');
    secondInput.setAttribute('placeholder', 'Ссылка на картинку');

    const secondHint = hints[1];
    secondHint.setAttribute('id', 'link-hint');

    const button = template.querySelector('button');
    button.setAttribute('disabled', '');
    button.textContent = '+';

    this.container.appendChild(template);
  }

  createEditPopup() {
    const template = this.templatePopup();

    const title = template.querySelector('h3');
    title.textContent = 'Редактировать профиль'

    const form = template.querySelector('form');
    form.setAttribute('name', 'edit');

    const inputs = template.querySelectorAll('input');

    const firstInput = inputs[0];
    firstInput.classList.add('popup__input_type_person-name');
    firstInput.setAttribute('name', 'person-name');
    firstInput.setAttribute('id', 'person-name');
    firstInput.setAttribute('minlength', '2');
    firstInput.setAttribute('maxlength', '30');
    firstInput.setAttribute('placeholder', 'Имя');

    const hints = template.querySelectorAll('.popup__hint')

    const firstHint = hints[0];
    firstHint.setAttribute('id', 'person-name-hint');

    const secondInput = inputs[1];
    secondInput.classList.add('popup__input_type_about');
    secondInput.setAttribute('name', 'about');
    secondInput.setAttribute('id', 'about');
    secondInput.setAttribute('minlength', '2');
    secondInput.setAttribute('maxlength', '30');
    secondInput.setAttribute('placeholder', 'О себе');

    const secondHint = hints[1];
    secondHint.setAttribute('id', 'about-hint');

    const button = template.querySelector('button');
    button.classList.add('popup__button_type_save')
    button.textContent = 'Сохранить';

    this.container.appendChild(template);
  }

  createImagePopup() {
    const imageBox = document.createElement('div');
    imageBox.classList.add('popup__image-box');

    const closeBtn = document.createElement('img');
    closeBtn.classList.add('popup__close');
    closeBtn.setAttribute('src', './images/close.svg');
    closeBtn.setAttribute('alt', '');

    imageBox.appendChild(closeBtn);

    this.container.appendChild(imageBox);
  }

  fillInputs(firstEl, firstInput, secondEl, secondInput, submitButton) {
    firstInput.value = firstEl.textContent;
    secondInput.value = secondEl.textContent;
    submitButton.removeAttribute('disabled', '');
  }




  makeBigPhoto(event) {
    if (event.target.classList.contains('place-card__image')) {
      const url = event.target.getAttribute('data');
      const imageBox = this.container.querySelector('.popup__image-box');
      const popupImage = document.createElement('img');

      popupImage.classList.add('popup__image');
      popupImage.setAttribute('src', url);
      popupImage.setAttribute('alt', '');
      imageBox.appendChild(popupImage);
    }
  }

  deleteBigPhoto() {
    this.container.querySelector('.popup__image-box').removeChild(this.container.querySelector('.popup__image'));
  }


  resetInputs() {
    this.container.querySelectorAll('.form__input').forEach((input) => {
      input.value = '';
    });
  }
}

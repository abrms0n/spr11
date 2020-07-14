export class Card {
    constructor(name, link, imagePop, container) {
      this.name = name;
      this.link = link;
      this.imagePop = imagePop;
      this.container = container;
    }

    like = (event) => {
      event.target.classList.toggle('place-card__like-icon_liked');
    }

     /** REVIEW: Надо исправить:              OK
     * 
     *  При удалении карточки нет удаления обработчиков с её элементов, нужно создать метод, например
     *  removeEventListeners, который будет удалять обработчики и потом вызвать этот метод в методе remove.
     * 
     *  Реализация должна выглядеть примерно так:
     *  removeListeners = () => {
     *   this.cardElement.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
     *   this.cardElement.removeEventListener('click', ...);
     *   ...
     *  }
     */
    remove = (event) => {
      /** REVIEW: Надо исправить:             OK
       * 
       * Использование в классе Card глобальной переменной placesList для удаления карточки категорически недопустимо
       * 
       * Не стоит использовать глобальную переменную в классе, т.к. при дальнейшей разработке программы может получиться, что
       * карточки будут вставляться в несколько разных контейнеров. Использование глобальных переменных считается плохим тоном 
       * при разработке программ.
       * 
       * Если что-то нужно использовать в классе нужно передавать это через параметры конструктора или параметры метода. 
       * Так код получается более гибким и легче может переиспользоваться.
       */
      this.container.removeChild(event.target.closest('.place-card'));
      this.removeListeners();
    }

    create = () => {
      const card = document.createElement('div');
      card.classList.add('place-card');

      const cardImage = document.createElement('div');
      cardImage.classList.add('place-card__image');
      cardImage.style = `background-image: url(${this.link})`;
      cardImage.setAttribute('data', this.link);

      const cardDeleteButton = document.createElement('button');
      cardDeleteButton.classList.add('place-card__delete-icon');

      const cardDescription = document.createElement('div');
      cardDescription.classList.add('place-card__description');

      const cardName = document.createElement('h3');
      cardName.classList.add('place-card__name');
      cardName.textContent = this.name;

      const cardLike = document.createElement('button');
      cardLike.classList.add('place-card__like-icon');

      card.appendChild(cardImage);
      cardImage.appendChild(cardDeleteButton);
      card.appendChild(cardDescription);
      cardDescription.appendChild(cardName);
      cardDescription.appendChild(cardLike);

      this.cardElement = card;
      /** REVIEW: Можно лучше:
       * 
       * Добавление обработчиков должно происходить до вставки карточки в разметку, т.е вызывать метод 
       * setEventListeners() нужно здесь
       */
      return card;
    }

    setEventListeners = () => {
      /** REVIEW: Можно лучше:
       * 
       * Поиск элементов с классами .place-card__like-icon, .place-card__delete-icon и place-card__image и будет происходить дважды -
       * в методах setEventListeners и removeEventListeners  класса Card, лучше всего вынести поиск данных элементов в метод create и 
       * переиспользовать, чтобы не находить их в обоих методах дважды.
       */
      this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like )
      this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove )
      this.cardElement.querySelector('.place-card__image').addEventListener('click', () => {
        /** REVIEW: Можно лучше:
         *  
         * Всю логику открытия попапа с большой картинкой и реализацию данного функционала лучше вынести в отдельный
         * класс, например ImagePopup, который будет отвечать только за отображение большой картинки 
         */
        if (event.target.classList.contains('place-card__image')) {
        this.imagePop.makeBigPhoto(event);
        this.imagePop.open();
        }
      })
    }

    removeListeners = () => {
      this.cardElement.querySelector('.place-card__like-icon').removeEventListener('click', this.like )
      this.cardElement.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove )
      this.cardElement.querySelector('.place-card__image').removeEventListener('click', () => {
        if (event.target.classList.contains('place-card__image')) {
        this.imagePop.makeBigPhoto(event);
        this.imagePop.open();
        }
      })
    } 
  }

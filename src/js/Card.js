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

    remove = (event) => {

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

      return card;
    }

    setEventListeners = () => {

      this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like )
      this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove )
      this.cardElement.querySelector('.place-card__image').addEventListener('click', () => {

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

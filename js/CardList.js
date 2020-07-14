class CardList {
    constructor(container) {
      this.container = container;
    }
    render = (array) => {
      array.forEach((card) => {
        this.container.append(card.cardElement)
      })
    }

    addCard(card) {
      this.container.appendChild(card.create());
      card.setEventListeners();
    }
  }

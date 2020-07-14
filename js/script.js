const api = new Api({
  baseUrl: 'https://praktikum.tk/cohort11',
  headers: {
    authorization: 'be9e8da7-dc96-4836-a9fe-700027c799a5',
    'Content-Type': 'application/json'
  }
});

const personName = document.querySelector('.user-info__name');
const about = document.querySelector('.user-info__job');
const userPic = document.querySelector('.user-info__photo');

const addPopup = new Popup(document.querySelector('.popup_type_add'));
const editPopup = new Popup(document.querySelector('.popup_type_edit'));
const imagePopup = new Popup(document.querySelector('.popup_type_image'));

const user = new UserInfo('Jaques Causteau', 'Sailor, researcher');

addPopup.createAddPopup();
editPopup.createEditPopup();
imagePopup.createImagePopup();

const addPopupOpenButton = document.querySelector('.user-info__button');
const addPopupCloseButton = document.querySelector('.popup_type_add .popup__close');
const editPopupOpenButton = document.querySelector('.user-info__edit-button');
const editPopupCloseButton = document.querySelector('.popup_type_edit .popup__close');

const personNameInput = document.querySelector('.popup__input_type_person-name');
const aboutInput = document.querySelector('.popup__input_type_about');
const saveInfoButton = document.querySelector('.popup__button_type_save');
const imagePopupCloseButton = document.querySelector('.popup_type_image .popup__close');

const spinner = document.querySelector('.spinner');
const placesList = document.querySelector('.places-list');
const cardList = new CardList(placesList);
const addForm = document.forms.new;
const editForm = document.forms.edit;
const addFormValidator = new FormValidator(addForm);
const editFormValidator = new FormValidator(editForm);
const addPopupAddButton = addForm.querySelector('.button');



function renderLoading(isLoading) {
  if (isLoading) {
    placesList.classList.add('places-list__hidden');
    spinner.classList.add('spinner_is-visible')
  } else {
    placesList.classList.remove('places-list__hidden');
    spinner.classList.remove('spinner_is-visible')
  }
}

function renderServerCards() {
  renderLoading(true);
  api.getInitialCards()
  .then(res => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибочка вышла: ${res.status}`);
    }
  })
  .then((data) => {
    const bit = data.slice(0, 50);          // студент: иначе ну ОЧЕНЬ медленно грузится :)
      const serverCards = bit.map(item => {                             
          item = new Card(item.name, item.link, imagePopup);
          item.create();
          item.setEventListeners();
          return item
        });
      cardList.render(serverCards);
  })
  .catch((err) => {
    console.log(`Ошибочка вышла: ${err}`);
  })
  .finally(() => renderLoading(false))
}



function renderUserInfo() {
  api.getUserInfo()
  .then(res => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибочка вышла: ${res.status}`);
    }
  })                                     
  .then((data) => {
    user.name = data.name;                                         
    user.job = data.about;
    user.pic = data.avatar;
    user.updateUserInfo(personName, about, userPic);
  })
  .catch((err) => {
    console.log(`Ошибочка вышла: ${err}`);
  })
}






addPopupOpenButton.addEventListener('click', () =>  {
  addPopup.open();
});

addPopupCloseButton.addEventListener('click', () =>  {
  addPopup.close();
  addFormValidator.resetErrors();
  addPopup.resetInputs();
});

addForm.addEventListener('submit', function(event) {
  event.preventDefault();
  cardList.addCard(new Card(addForm.elements.name.value, addForm.elements.link.value, imagePopup));
  addPopup.close();
  addFormValidator.setSubmitButtonState(addPopupAddButton, false);
})

editPopupOpenButton.addEventListener('click', () => {
  editPopup.open();
  editPopup.fillInputs(personName, personNameInput, about, aboutInput, saveInfoButton);
});

editPopupCloseButton.addEventListener('click', () => {
  editPopup.close();
  editFormValidator.resetErrors()
});

editForm.addEventListener('submit', function(event) {
  event.preventDefault();
  api.updateUserInfo(personNameInput.value, aboutInput.value)
  .then(res => {
    if (res.ok) {
    return res.json()
    } else {
    return Promise.reject(`Ошибочка вышла: ${res.status}`);
    }
  })                              
  .then((data) => {
    user.setUserInfo(data.name, data.about, data.avatar);                                
    user.updateUserInfo(personName, about, userPic);
  })
  .catch((err) => {
    console.log(`Ошибочка вышла: ${err}`);
  })
  editPopup.close();
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' ) {
    editPopup.close();
    editFormValidator.resetErrors()
    addPopup.close();
    addFormValidator.resetErrors();
    addPopup.resetInputs();
  }
});

imagePopupCloseButton.addEventListener('click', () => {
   imagePopup.close();
   imagePopup.deleteBigPhoto();
});


renderServerCards();
renderUserInfo();

addFormValidator.setEventListeners();
editFormValidator.setEventListeners();


import {Api} from './Api.js';
import {Card} from './Card.js';
import {CardList} from './CardList.js';
import {FormValidator} from './FormValidator.js';
import {Popup} from './Popup.js';
import {UserInfo} from './UserInfo.js';

/** REVIEW: Надо исправить:          OK
 * 
 * Код разбит на разные файлы, но в отдельных файлах глобальные переменные должны быть скрыты (обернуты в IIFE или просто функцию)
 * 
 * Проще всего будет обернуть весь код в данном файле в IIFE, наприемр:
 * 
 * (function () {
 *   ....
 *   code                                           
 *   ....
 *  })();
 * 
 * Подробнее про IIFE: https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%BD%D0%B5%D0%BC%D0%B5%D0%B4%D0%BB%D0%B5%D0%BD%D0%BD%D0%BE-%D0%B2%D1%8B%D0%B7%D1%8B%D0%B2%D0%B0%D0%B5%D0%BC%D1%8B%D0%B5-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B8-iife-%D0%B8-%D0%BD%D0%B5%D0%BC%D0%BD%D0%BE%D0%B3%D0%BE-%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%B5-ff8e9ba409eb
 */

(function app() {

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
  
  /* REVIEW: Надо исправить:      OK
  
    Проверка на то, пришел ли успешный ответ с сервера должна происходить в методе getInitialCards класса Api, 
    либо даже лучше - в отдельном методе, отвечающем за разбор ответа с сервера т.е
    код - 
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибочка вышла: ${res.status}`);
      }
    }) 
  
    Нужно вынести в класс API                                                     
    Также для других методов
  
    В script.js остается только обработка полученных с сервера данных, .catch для обработки ошибок и .finally
    */
  function renderServerCards() {
    renderLoading(true);
    api.getInitialCards()
    .then((data) => {
      const bit = data.slice(0, 50);          // студент: иначе ну ОЧЕНЬ медленно грузится :)
        const serverCards = bit.map(item => {  
            /** REVIEW: Можно лучше::
             * 
             * Не стоит создавать сущность класса внутри then - будет ошибка - сущность не создастся
             */                           
            item = new Card(item.name, item.link, imagePopup, placesList);
            item.create();
            item.setEventListeners();
            return item
          });
        cardList.render(serverCards);
    })
    .catch((err) => {
      console.log(`Ошибочка вышла: ${err}`);
      alert(`Ошибочка вышла: ${err}`);
    })
    .finally(() => renderLoading(false))
  }
  
  
  
  function renderUserInfo() {
    api.getUserInfo()                                 
    .then((data) => {
      user.name = data.name;                                         
      user.job = data.about;
      user.pic = data.avatar;
      user.updateUserInfo(personName, about, userPic);
    })
    .catch((err) => {
      console.log(`Ошибочка вышла: ${err}`);
      alert(`Ошибочка вышла: ${err}`);
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
    cardList.addCard(new Card(addForm.elements.name.value, addForm.elements.link.value, imagePopup, placesList));
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
    .then((data) => {
      user.setUserInfo(data.name, data.about, data.avatar);                                
      user.updateUserInfo(personName, about, userPic);
    })
    .catch((err) => {
      console.log(`Ошибочка вышла: ${err}`);
      alert(`Ошибочка вышла: ${err}`);
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
  
 }());




/** REVIEW:
 * 
 * В целом по работе: 
 * 
 * Хорошая работа, почти все запросы к API выполняются корректно. Код логично организован, методы классов и функции имеют понятные
 * и описательные названия. Запросы на сервер отправляются, данные сохраняются, но к организации кода есть несколько замечаний:
 * 
 * Наша команда приносит извинения, при проверке работы на предыдущем спринте были пропущены следующие ошибки:
 * 
 * 1) Код разбит на разные файлы, но в отдельных файлах глобальные переменные должны быть скрыты (обернуты в IIFE или просто функцию)
 * 2) При удалении карточки нет удаления обработчиков с её элементов, нужно создать метод, например removeEventListeners, 
 * который будет удалять обработчики и потом вызвать этот метод в методе remove (класс Card)
 * 3) Использование в классе Card глобальной переменной placesList для удаления карточки категорически недопустимо
 * 
 * 
 * Данные исправления необходимо внести, т.к в дальнейшем вы можете столкнуться с проблемами при выполнении заданий и 
 * сдачи проектных и дипломной работы"
 * Для исправления данных замечаний попросила добавить Вам дней к делайну
 * 
 * По 9 проектной работе:
 * 
 * Надо исправить: 1) Некорректная структура методов класса Api (см. комментарии в классе Api и index.js)
 * 2) Не подгружаются карточки с сервера, в консоли появляется ошибка: TypeError: data.slice is not a function
 * 
 * После исправления всех критических ошибок работа будет принята. 
 * 
 * Можно лучше: 1) Поиск элементов с классами .place-card__like-icon, .place-card__delete-icon и place-card__image и будет происходить дважды -
 * в методах setEventListeners и removeEventListeners класса Card, лучше всего вынести поиск данных элементов в метод create и 
 * переиспользовать, чтобы не находить их в обоих методах дважды.
 * 2) Всю логику открытия попапа с большой картинкой и реализацию данного функционала лучше вынести в отдельный
 * класс, например ImagePopup, который будет отвечать только за отображение большой картинки 
 * 3) Добавление обработчиков должно происходить до вставки карточки в разметку, т.е вызывать метод setEventListeners() нужно
 * в методе create класса Card
 * 4) Каждый класс должен выполнять строго одну задачу (Popup)
 */
import '../pages/index.css';
import { makeCard, likeCard } from './card';
import { openModal, closeModal } from './modal';
import { enableValidation, clearValidation } from './validation';
import { getUserInfo, getInitialCards, patchProfile, postNewCard, deleteCard, patchAvatar } from './api';

const placesList = document.querySelector('.places__list');
const modals = document.querySelectorAll('.popup');

const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('.popup_type_edit');

const addNewCardButton = document.querySelector('.profile__add-button');
const addNewCardModal = document.querySelector('.popup_type_new-card');

const showImageModal = document.querySelector('.popup_type_image');

const editAvatarButton = document.querySelector('.profile__image-container');
const editAvatarModal = document.querySelector('.popup_type_edit-avatar');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.elements.name;
const descriptionInput = editProfileForm.elements.description;
const editProfileSubmitButton = editProfileForm.querySelector('.popup__button');

const newPlaceForm = document.forms['new-place'];
const placeNameInput = newPlaceForm.elements['place-name'];
const placeLinkInput = newPlaceForm.elements.link;
const newPlaceSubmitButton = newPlaceForm.querySelector('.popup__button');

const editAvatarForm = document.forms['edit-avatar'];
const newAvatarLinkInput = editAvatarForm.elements['avatar-link'];
const editAvatarSubmitButton = editAvatarForm.querySelector('.popup__button');

const popupImageElement = document.querySelector('.popup__image');
const popupCaptionElement = document.querySelector('.popup__caption');

const confirmDeleteModal = document.querySelector('.popup_type_confirm-delete');
const confirmDeleteForm = document.forms['confirm-delete'];
const confirmDeleteSubmitButton = confirmDeleteForm.querySelector('.popup__button');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

let userId = undefined;

let cardToDelete = undefined;
let cardElementToDelete = undefined;

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, initialCards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.src = userData.avatar;

    userId = userData._id;

    initialCards.forEach(card => appendNewCard(userId, card));
  })
  .catch(err => {
    console.error(err);
  });

const setImageToModal = ({ name, link }) => {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaptionElement.textContent = name;
};

const handleImageClick = ({ name, link }) => {
  setImageToModal({ name, link });
  openModal(showImageModal);
};

const handleDeleteClick = (cardData, cardElement) => {
  openModal(confirmDeleteModal);
  cardToDelete = cardData;
  cardElementToDelete = cardElement;
};

const cardFuncs = {
  deleteFunc: handleDeleteClick,
  likeFunc: likeCard,
  imageFunc: handleImageClick
};

const appendNewCard = (userId, cardData) => placesList.append(makeCard(userId, cardData, cardFuncs));
const prependNewCard = (userId, cardData) => placesList.prepend(makeCard(userId, cardData, cardFuncs));

modals.forEach(modal => {
  modal.classList.add('popup_is-animated');

  modal.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closeModal(modal);
    }

    if (evt.target.classList.contains('popup__close')) {
      closeModal(modal);
    }
  });
});

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(editProfileModal);
});

addNewCardButton.addEventListener('click', () => openModal(addNewCardModal));

editAvatarButton.addEventListener('click', () => {
  editAvatarForm.reset();
  clearValidation(editAvatarForm, validationConfig);
  openModal(editAvatarModal);
});

editProfileForm.addEventListener('submit', evt => {
  evt.preventDefault();
  editProfileSubmitButton.textContent = 'Сохранение...';

  patchProfile(nameInput.value, descriptionInput.value)
    .then(newProfileData => {
      profileTitle.textContent = newProfileData.name;
      profileDescription.textContent = newProfileData.about;

      closeModal(editProfileModal);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      editProfileSubmitButton.textContent = 'Сохранить';
    });
});

newPlaceForm.addEventListener('submit', evt => {
  evt.preventDefault();
  newPlaceSubmitButton.textContent = 'Сохранение...';

  postNewCard(placeNameInput.value, placeLinkInput.value)
    .then(newCardData => {
      prependNewCard(userId, newCardData);

      newPlaceForm.reset();
      clearValidation(newPlaceForm, validationConfig);

      closeModal(addNewCardModal);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      newPlaceSubmitButton.textContent = 'Сохранить';
    });
});

editAvatarForm.addEventListener('submit', evt => {
  evt.preventDefault();
  editAvatarSubmitButton.textContent = 'Сохранение...';

  patchAvatar(newAvatarLinkInput.value)
    .then(userData => {
      profileImage.src = userData.avatar;
      closeModal(editAvatarModal);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      editAvatarSubmitButton.textContent = 'Сохранить';
    });
});

confirmDeleteForm.addEventListener('submit', evt => {
  evt.preventDefault();
  confirmDeleteSubmitButton.textContent = 'Удаление...';

  deleteCard(cardToDelete)
    .then(() => {
      cardElementToDelete.remove();
      closeModal(confirmDeleteModal);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      confirmDeleteSubmitButton.textContent = 'Да';
    });
});

enableValidation(validationConfig);

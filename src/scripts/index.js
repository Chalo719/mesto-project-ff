import '../pages/index.css';
import { makeCard, likeCard } from './card';
import { openModal, closeModal } from './modal';
import { handleEditProfileFormSubmit } from './forms';
import { enableValidation, clearValidation } from './validation';
import { getUserInfo, getInitialCards, patchProfile, postNewCard, deleteCard, patchAvatar, checkImageUrl } from './api';

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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const userData = getUserInfo()
  .then(userData => {
    return userData;
  })
  .catch(err => {
    console.error(err);
  });

const initialCards = getInitialCards()
  .then(initialCards => {
    return initialCards;
  })
  .catch(err => {
    console.error(err);
  });

let userId = undefined;

Promise.all([userData, initialCards])
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

const setImageToModal = evt => {
  const currentImage = evt.currentTarget;

  popupImageElement.src = currentImage.src;
  popupImageElement.alt = currentImage.alt;
  popupCaptionElement.textContent = currentImage.alt;
};

const handleImageClick = evt => {
  setImageToModal(evt);
  openModal(showImageModal);
};

const cardFuncs = {
  deleteFunc: deleteCard,
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
      handleEditProfileFormSubmit(newProfileData, profileTitle, profileDescription);

      closeModal(editProfileModal);
      editProfileSubmitButton.textContent = 'Сохранить';
    })
    .catch(err => {
      console.error(err);
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
      newPlaceSubmitButton.textContent = 'Сохранить';
    })
    .catch(err => {
      console.error(err);
    });
});

editAvatarForm.addEventListener('submit', evt => {
  evt.preventDefault();
  editAvatarSubmitButton.textContent = 'Сохранение...';

  checkImageUrl(newAvatarLinkInput.value)
    .then(res => {
      if (res.headers.get('content-type').startsWith('image/')) {
        patchAvatar(newAvatarLinkInput.value)
          .then(userData => {
            profileImage.src = userData.avatar;

            closeModal(editAvatarModal);
            editAvatarSubmitButton.textContent = 'Сохранить';
          })
          .catch(err => {
            console.error(err);
          });
      }
    })
    .catch(err => {
      console.error(err);
    });
});

enableValidation(validationConfig);

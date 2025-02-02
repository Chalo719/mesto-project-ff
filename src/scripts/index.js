import '../pages/index.css';
import initialCards from './cards';
import { makeCard, deleteCard, likeCard } from './card';
import { openModal, closeModal } from './modal';
import { handleEditProfileFormSubmit, handleNewPlaceFormSubmit } from './forms';

const placesList = document.querySelector('.places__list');
const modals = document.querySelectorAll('.popup');

const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('.popup_type_edit');

const addNewCardButton = document.querySelector('.profile__add-button');
const addNewCardModal = document.querySelector('.popup_type_new-card');

const showImageModal = document.querySelector('.popup_type_image');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.elements.name;
const descriptionInput = editProfileForm.elements.description;

const newPlaceForm = document.forms['new-place'];
const placeNameInput = newPlaceForm.elements['place-name'];
const placeLinkInput = newPlaceForm.elements.link;

const popupImageElement = document.querySelector('.popup__image');
const popupCaptionElement = document.querySelector('.popup__caption');

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

const prependNewCard = cardData => placesList.prepend(makeCard(cardData, cardFuncs));

initialCards.forEach(prependNewCard);

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
  openModal(editProfileModal);
});

addNewCardButton.addEventListener('click', () => openModal(addNewCardModal));

editProfileForm.addEventListener('submit', evt => {
  handleEditProfileFormSubmit(evt, nameInput, descriptionInput, profileTitle, profileDescription);
  closeModal(editProfileModal);
});

newPlaceForm.addEventListener('submit', evt => {
  const newCardData = handleNewPlaceFormSubmit(evt, placeNameInput, placeLinkInput);
  prependNewCard(newCardData);
  closeModal(addNewCardModal);
  newPlaceForm.reset();
});

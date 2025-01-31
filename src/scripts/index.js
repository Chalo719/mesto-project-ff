import '../pages/index.css';
import initialCards from './cards';
import { makeCard, deleteCard, likeCard, setImageToModal } from './card';
import { openModal, closeModal } from './modal';
import { handleEditProfileFormSubmit, handleNewPlaceFormSubmit } from './forms';

const placesList = document.querySelector('.places__list');

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

const prependNewCard = cardData => placesList.prepend(makeCard(cardData, deleteCard, likeCard, setImageToModal));

initialCards.forEach(prependNewCard);

[editProfileModal, addNewCardModal, showImageModal].forEach(modal => modal.classList.add('popup_is-animated'));

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

addNewCardButton.addEventListener('click', () => openModal(addNewCardModal));

placesList.addEventListener('click', evt => {
  if (evt.target.classList.contains('card__image')) openModal(showImageModal);
});

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

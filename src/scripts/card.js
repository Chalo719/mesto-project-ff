import { openModal, closeModal } from "./modal";
import { putLike, deleteLike } from "./api";

function makeCard(userId, cardData, { deleteFunc, likeFunc, imageFunc }) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardElementImage = cardElement.querySelector('.card__image');
  const cardElementTitle = cardElement.querySelector('.card__title');
  const cardElementDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');

  const confirmDeleteModal = document.querySelector('.popup_type_confirm-delete');
  const confirmDeleteForm = document.forms['confirm-delete'];
  const confirmDeleteSubmitButton = confirmDeleteForm.querySelector('.popup__button');

  const isLikedByMe = cardData.likes.some(user => {
    return userId === user._id;
  });

  function deleteEventListener(evt) {
    evt.preventDefault();
    confirmDeleteSubmitButton.textContent = 'Удаление...';

    deleteFunc(cardData)
      .then(() => {
        cardElement.remove();

        closeModal(confirmDeleteModal);
        confirmDeleteSubmitButton.textContent = 'Да';
      })
      .catch(err => {
        console.error(err);
      });
  }

  cardElementImage.src = cardData.link;
  cardElementImage.alt = cardData.name;
  cardElementTitle.textContent = cardData.name;

  if (userId === cardData.owner._id) {
    cardElementDeleteButton.addEventListener('click', () => {
      confirmDeleteModal._deleteCardForm = confirmDeleteForm;
      confirmDeleteModal._deleteCardListener = deleteEventListener;
      openModal(confirmDeleteModal);

      confirmDeleteForm.addEventListener('submit', deleteEventListener);
    });
  } else {
    cardElementDeleteButton.remove();
  }

  if (isLikedByMe) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  cardLikeButton.addEventListener('click', () => likeFunc(cardData, cardLikeButton, cardLikeCounter));
  cardElementImage.addEventListener('click', imageFunc);

  cardLikeCounter.textContent = cardData.likes.length;

  return cardElement;
}

function likeCard(cardData, likeButton, likeCounter) {
  likeButton.classList.toggle('card__like-button_is-active');

  if (likeButton.classList.contains('card__like-button_is-active')) {
    putLike(cardData)
      .then(newCardData => {
        likeCounter.textContent = newCardData.likes.length;
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    deleteLike(cardData)
      .then(newCardData => {
        likeCounter.textContent = newCardData.likes.length;
      })
      .catch(err => {
        console.error(err);
      });
  }
}

export { makeCard, likeCard };

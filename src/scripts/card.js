import { putLike, deleteLike } from "./api";

function makeCard(userId, cardData, { deleteFunc, likeFunc, imageFunc }) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardElementImage = cardElement.querySelector('.card__image');
  const cardElementTitle = cardElement.querySelector('.card__title');
  const cardElementDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');

  const isLikedByMe = cardData.likes.some(user => {
    return userId === user._id;
  });

  cardElementImage.src = cardData.link;
  cardElementImage.alt = cardData.name;
  cardElementTitle.textContent = cardData.name;

  if (userId === cardData.owner._id) {
    cardElementDeleteButton.addEventListener('click', () => deleteFunc(cardData, cardElement));
  } else {
    cardElementDeleteButton.remove();
  }

  if (isLikedByMe) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  cardLikeButton.addEventListener('click', () => likeFunc(cardData, cardLikeButton, cardLikeCounter));
  cardElementImage.addEventListener('click', () => imageFunc(cardData));

  cardLikeCounter.textContent = cardData.likes.length;

  return cardElement;
}

function likeCard(cardData, likeButton, likeCounter) {
  if (!likeButton.classList.contains('card__like-button_is-active')) {
    putLike(cardData)
      .then(newCardData => {
        likeButton.classList.add('card__like-button_is-active');
        likeCounter.textContent = newCardData.likes.length;
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    deleteLike(cardData)
      .then(newCardData => {
        likeButton.classList.remove('card__like-button_is-active');
        likeCounter.textContent = newCardData.likes.length;
      })
      .catch(err => {
        console.error(err);
      });
  }
}

export { makeCard, likeCard };

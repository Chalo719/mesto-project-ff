function makeCard(cardData, { deleteFunc, likeFunc, imageFunc }) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardElementImage = cardElement.querySelector('.card__image');
  const cardElementTitle = cardElement.querySelector('.card__title');
  const cardElementDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardElementImage.src = cardData.link;
  cardElementImage.alt = cardData.name;
  cardElementTitle.textContent = cardData.name;

  cardElementDeleteButton.addEventListener('click', () => deleteFunc(cardElement));
  cardLikeButton.addEventListener('click', () => likeFunc(cardLikeButton));
  cardElementImage.addEventListener('click', imageFunc);

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

export { makeCard, deleteCard, likeCard };

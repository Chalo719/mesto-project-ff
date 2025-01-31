function makeCard(cardData, deleteFunc, likeFunc, setImageFunc) {
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
  cardLikeButton.addEventListener('click', likeFunc);
  cardElementImage.addEventListener('click', setImageFunc);

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(evt) {
  const likeButton = evt.currentTarget;
  likeButton.classList.toggle('card__like-button_is-active');
}

function setImageToModal(evt) {
  const currentImage = evt.currentTarget;
  const popupImageElement = document.querySelector('.popup__image');
  const popupCaptionElement = document.querySelector('.popup__caption');

  popupImageElement.src = currentImage.src;
  popupImageElement.alt = currentImage.alt;
  popupCaptionElement.textContent = currentImage.alt;
}

export { makeCard, deleteCard, likeCard, setImageToModal };

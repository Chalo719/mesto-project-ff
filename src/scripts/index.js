import '../pages/index.css';
import initialCards from './cards';

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function makeCard(cardData, deleteFunc) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardElementImage = cardElement.querySelector('.card__image');
  const cardElementTitle = cardElement.querySelector('.card__title');
  const cardElementDeleteButton = cardElement.querySelector('.card__delete-button');

  cardElementImage.src = cardData.link;
  cardElementImage.alt = cardData.name;
  cardElementTitle.textContent = cardData.name;

  cardElementDeleteButton.addEventListener('click', () => deleteFunc(cardElement));

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach(card => placesList.append(makeCard(card, deleteCard)));

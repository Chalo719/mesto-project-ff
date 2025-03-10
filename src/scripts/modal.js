function openModal(modal) {
  document.addEventListener('keydown', closeByEscape);
  modal.classList.add('popup_is-opened');
}

function closeModal(modal) {
  document.removeEventListener('keydown', closeByEscape);
  modal.classList.remove('popup_is-opened');
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

export { openModal, closeModal };

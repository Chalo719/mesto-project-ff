function openModal(modal) {
  const closeButton = modal.querySelector('.popup__close');
  const closeByEscape = evt => {
    if (evt.key === 'Escape') closeModal(modal);
  };

  closeButton.addEventListener('click', () => closeModal(modal));
  modal.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup')) closeModal(modal);
  });
  document.addEventListener('keydown', closeByEscape);

  modal._closeByEscape = closeByEscape;

  modal.classList.add('popup_is-opened');
}

function closeModal(modal) {
  document.removeEventListener('keydown', modal._closeByEscape);

  modal.classList.remove('popup_is-opened');
}

export { openModal, closeModal };

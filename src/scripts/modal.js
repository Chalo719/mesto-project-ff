function openModal(modal) {
  const closeByEscape = evt => {
    if (evt.key === 'Escape') closeModal(modal);
  };

  document.addEventListener('keydown', closeByEscape);
  modal._closeByEscape = closeByEscape;

  modal.classList.add('popup_is-opened');
}

function closeModal(modal) {
  document.removeEventListener('keydown', modal._closeByEscape);

  modal.classList.remove('popup_is-opened');
}

export { openModal, closeModal };

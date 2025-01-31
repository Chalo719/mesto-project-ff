function handleEditProfileFormSubmit(evt, nameInput, descriptionInput, profileTitle, profileDescription) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
}

function handleNewPlaceFormSubmit(evt, placeNameInput, placeLinkInput) {
  evt.preventDefault();

  return {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };
}

export { handleEditProfileFormSubmit, handleNewPlaceFormSubmit };

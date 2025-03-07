function handleEditProfileFormSubmit(profileData, profileTitle, profileDescription) {
  profileTitle.textContent = profileData.name;
  profileDescription.textContent = profileData.about;
}

export { handleEditProfileFormSubmit };

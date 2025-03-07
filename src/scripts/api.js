const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-33',
  headers: {
    authorization: 'af35851f-2e16-413a-b4df-859d725d5779',
    'Content-Type': 'application/json'
  }
}

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

const patchProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

const postNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

const deleteCard = (card) => {
  return fetch(`${config.baseUrl}/cards/${card._id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

const putLike = (card) => {
  return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

const deleteLike = (card) => {
  return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

const patchAvatar = (newAvatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatarUrl
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

const checkImageUrl = (url) => {
  return fetch(url, {
    method: 'HEAD'
  })
    .then(res => {
      if (res.ok) {
        return res;
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export { getUserInfo, getInitialCards, patchProfile, postNewCard, deleteCard, putLike, deleteLike, patchAvatar, checkImageUrl };

class Api {
  constructor(config) {
    this.headers = config.headers;
    this.url = config.url;
  }

  editUser(token, dataUser) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataUser),
    }).then(this._getResponseData);
  }

  getCards(token) {
    return fetch(`${this.url}/cards`, {
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }

  createCard(token, dataCard) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataCard),
    }).then(this._getResponseData);
  }

  deleteCard(token, id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }

  putLike(token, id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: "PUT",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }

  deleteLike(token, id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }

  editAvatar(token, dataAvatar) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataAvatar),
    }).then(this._getResponseData);
  }

  _getResponseData(res) {
    if (!res.ok) {
      // eslint-disable-next-line no-undef
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}

const configApi = {
  url: "https://murat.mesto.backend.nomoredomains.icu",
  headers: {
    "Content-Type": "application/json",
  },
};

const api = new Api(configApi);

export default api;

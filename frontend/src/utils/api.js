class Api {
  constructor(config) {
    this.headers = config.headers;
    this.url = config.url;
  }

  editUser(dataUser) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(dataUser),
    }).then(this._getResponseData);
  }

  getCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    }).then(this._getResponseData);
  }

  createCard(dataCard) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(dataCard),
    }).then(this._getResponseData);
  }

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._getResponseData);
  }

  putLike(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: "PUT",
      headers: this.headers,
    }).then(this._getResponseData);
  }

  deleteLike(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._getResponseData);
  }

  editAvatar(dataAvatar) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
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
  url: "http://murat.mesto.backend.nomoredomains.icu",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

const api = new Api(configApi);

export default api;

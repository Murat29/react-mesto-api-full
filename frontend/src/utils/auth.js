class Auth {
  constructor(config) {
    this.headers = config.headers;
    this.url = config.url;
  }
  register(password, email) {
    return fetch(`${this.url}/signup`, {
      method: "POST",
      headers: this.headers,
      credentials: "include",
      body: JSON.stringify({ password, email }),
    }).then(this._getResponseData);
  }

  authorize(password, email) {
    return fetch(`${this.url}/signin`, {
      method: "POST",
      headers: this.headers,
      credentials: "include",
      body: JSON.stringify({ password, email }),
    }).then(this._getResponseData);
  }

  checkToken(token) {
    return fetch(`${this.url}/users/me`, {
      method: "GET",
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => data);
  }

  _getResponseData(data) {
    if (!data.ok) {
      // eslint-disable-next-line no-undef
      return Promise.reject(`Ошибка: ${data.status}`);
    }
    return data.json();
  }
}

const configAuth = {
  url: "https://murat.mesto.backend.nomoredomains.icu",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const auth = new Auth(configAuth);

export default auth;

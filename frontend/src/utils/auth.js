class Auth {
  constructor(config) {
    this.headers = config.headers;
    this.url = config.url;
  }
  register(password, email) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ password, email }),
    }).then(this._getResponseData);
  }

  authorize(password, email) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ password, email }),
    }).then(this._getResponseData);
  }

  checkToken(token) {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
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
  url: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
};

const auth = new Auth(configAuth);

export default auth;

import React from 'react';
import PropTypes from 'prop-types';

function Login({ handleLogin }) {
  const [email, setEmail] = React.useState({
    value: '',
    errorMessage: '',
    valid: false,
  });
  const [password, setPassword] = React.useState({
    value: '',
    errorMessage: '',
    valid: false,
  });
  const [validForm, setValidForm] = React.useState(false);

  function handleChangeEmail(e) {
    setEmail({
      value: e.target.value,
      errorMessage: e.target.validationMessage,
      valid: e.target.validity.valid,
    });
  }

  function handleChangePassword(e) {
    setPassword({
      value: e.target.value,
      errorMessage: e.target.validationMessage,
      valid: e.target.validity.valid,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(password.value, email.value);
  }

  React.useEffect(() => {
    setValidForm(email.valid && password.valid);
  }, [email, password]);

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2 className="title">Вход</h2>
      <input
        className={`input input_white ${email.errorMessage && 'input_error'}`}
        placeholder="Email"
        value={email.value || ''}
        onChange={handleChangeEmail}
        minLength="2"
        maxLength="30"
        type="email"
        required
      />
      <span className="input-error-message" id="popup__input_card-name-error">
        {email.errorMessage}
      </span>
      <input
        value={password.value || ''}
        onChange={handleChangePassword}
        className={`input input_white ${
          password.errorMessage && 'input_error'
        }`}
        placeholder="Пароль"
        minLength="2"
        maxLength="30"
        type="password"
        required
      />
      <span className="input-error-message" id="popup__input_card-name-error">
        {password.errorMessage}
      </span>
      <button
        className={`button button_type_white ${
          !validForm && 'button_disabled'
        }`}
        disabled={!validForm}
        type="submit"
      >
        Войти
      </button>
    </form>
  );
}

Login.propTypes = {
  handleLogin: PropTypes.func,
};

export default Login;

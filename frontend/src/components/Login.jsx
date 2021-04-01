import React from "react";
import PropTypes from "prop-types";

function Login({ handleLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(password, email);
  }
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2 className="title">Вход</h2>
      <input
        className="input"
        placeholder="Email"
        value={email}
        onChange={handleChangeEmail}
        minLength="2"
        maxLength="30"
        type="email"
        required
      />
      <input
        className="input"
        placeholder="Пароль"
        value={password}
        onChange={handleChangePassword}
        minLength="2"
        maxLength="30"
        type="password"
        required
      />
      <button className="button button_type_white">Войти</button>
    </form>
  );
}

Login.propTypes = {
  handleLogin: PropTypes.func,
};

export default Login;

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Register({ registration }) {
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
    registration(password, email);
  }

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h2 className="title">Регистрация</h2>
      <input
        value={email}
        onChange={handleChangeEmail}
        className="input"
        placeholder="Email"
        minLength="2"
        maxLength="30"
        type="email"
        required
      />
      <input
        value={password}
        onChange={handleChangePassword}
        className="input"
        placeholder="Пароль"
        minLength="2"
        maxLength="30"
        type="password"
        required
      />
      <button className="button button_type_white">Зарегистрироваться</button>
      <Link to="sign-in" className="register__link">
        Уже зарегистрированы? Войти
      </Link>
    </form>
  );
}

Register.propTypes = {
  registration: PropTypes.func,
};

export default Register;

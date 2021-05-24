import React from 'react';
import logo from '../images/logo.svg';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

function Header(props) {
  function signOut() {
    localStorage.removeItem('token');
  }
  return (
    <header className="header">
      <img src={logo} alt="Логотип." className="header__logo" />
      {props.location.pathname === '/sign-up' && (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      )}
      {props.location.pathname === '/sign-in' && (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      )}
      {props.location.pathname === '/' && (
        <div className="header__container">
          <p className="header__email">{props.userEmail}</p>
          <Link to="/sign-in" className="header__link" onClick={signOut}>
            Выйти
          </Link>
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  location: PropTypes.object,
  userEmail: PropTypes.string,
};

export default withRouter(Header);

import React from "react";
import whiteСross from "../images/white-cross.svg";
import PropTypes from "prop-types";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_is-opened" : ""
      }`}
    >
      <div className="popup__container">
        <button className="button button_type_close">
          <img
            className="button__image"
            src={whiteСross}
            alt="Закрыть форму."
            onClick={props.closeAllPopups}
          />
        </button>
        <h2 className="popup__title">{props.title}</h2>

        <form
          onSubmit={props.onSubmit}
          className={`popup__form popup__form-${props.name}`}
          name={props.name}
          noValidate
        >
          <fieldset className="popup__input-container">
            {props.children}
          </fieldset>
        </form>
      </div>
    </div>
  );
}

PopupWithForm.propTypes = {
  name: PropTypes.string,
  isOpen: PropTypes.bool,
  closeAllPopups: PropTypes.func,
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default PopupWithForm;

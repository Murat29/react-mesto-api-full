import whiteСross from "../images/white-cross.svg";
import ok from "../images/ok.svg";
import error from "../images/error.svg";
import React from "react";
import PropTypes from "prop-types";

function InfoTooltip({ satateInfoTooltip, closeAllPopups }) {
  return (
    <div
      className={`popup popup_type_info ${
        satateInfoTooltip.isOpen ? "popup_is-opened" : ""
      }`}
    >
      <div className="popup__container">
        <button className="button button_type_close">
          <img
            className="button__image"
            src={whiteСross}
            alt="Закрыть форму."
            onClick={closeAllPopups}
          />
        </button>
        <img
          className="popup__img-status"
          alt="Статус"
          src={satateInfoTooltip.status ? ok : error}
        ></img>
        <h2 className="popup__title">
          {satateInfoTooltip.status
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

InfoTooltip.propTypes = {
  satateInfoTooltip: PropTypes.object,
  closeAllPopups: PropTypes.func,
};
export default InfoTooltip;

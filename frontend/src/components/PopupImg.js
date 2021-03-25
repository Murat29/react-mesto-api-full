import React from "react";
import whiteСross from "../images/white-cross.svg";
import PropTypes from "prop-types";

function PopupImg({ selectedCard, closeAllPopups }) {
  return (
    <div
      className={`popup popup_type_img ${
        selectedCard ? "popup_is-opened" : ""
      }`}
    >
      <div className="popup__img-container">
        <button className="button button_type_close">
          <img
            onClick={closeAllPopups}
            className="button__image"
            src={whiteСross}
            alt="Закрыть форму."
          />
        </button>
        <img
          className="popup__img"
          src={selectedCard ? selectedCard.link : "#"}
          alt={selectedCard ? selectedCard.name : ""}
        />
        <h3 className="popup__img-caption">
          {selectedCard ? selectedCard.name : ""}
        </h3>
      </div>
    </div>
  );
}

PopupImg.propTypes = {
  selectedCard: PropTypes.object,
  closeAllPopups: PropTypes.func,
};

export default PopupImg;

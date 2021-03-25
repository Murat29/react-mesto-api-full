import React from "react";
import PopupWithForm from "./PopupWithForm";
import PropTypes from "prop-types";

function PopupAddCard({ isOpen, closeAllPopups, onAddCard }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddCard({
      name,
      link,
    }).then(() => {
      handleClear();
    });
  }

  function handleClear() {
    setName("");
    setLink("");
  }

  React.useEffect(() => {
    if (!isOpen) {
      handleClear();
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      closeAllPopups={closeAllPopups}
      onSubmit={handleSubmit}
      name="add"
      title="Новое место"
    >
      <input
        value={name}
        onChange={handleChangeName}
        className="popup__input"
        id="popup__input_card-name"
        name="name"
        minLength="2"
        maxLength="30"
        type="text"
        placeholder="Название"
        required
      />
      <span className="popup__input-error" id="popup__input_card-name-error">
        Вы пропустили это поле.
      </span>
      <input
        value={link}
        onChange={handleChangeLink}
        className="popup__input"
        id="popup__input_card-link"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error" id="popup__input_card-link-error">
        Вы пропустили это поле.
      </span>
      <button
        className="button button__sabmit button_type_add-card"
        type="submit"
      >
        Создать
      </button>
    </PopupWithForm>
  );
}

PopupAddCard.propTypes = {
  isOpen: PropTypes.bool,
  closeAllPopups: PropTypes.func,
  onAddCard: PropTypes.func,
};

export default PopupAddCard;

import React from 'react';
import PopupWithForm from './PopupWithForm';
import PropTypes from 'prop-types';

function PopupAddCard({ isOpen, closeAllPopups, onAddCard }) {
  const [name, setName] = React.useState({
    value: '',
    errorMessage: '',
    valid: false,
  });
  const [link, setLink] = React.useState({
    value: '',
    errorMessage: '',
    valid: false,
  });
  const [validForm, setValidForm] = React.useState(false);

  function handleChangeName(e) {
    setName({
      value: e.target.value,
      errorMessage: e.target.validationMessage,
      valid: e.target.validity.valid,
    });
  }

  function handleChangeLink(e) {
    setLink({
      value: e.target.value,
      errorMessage: e.target.validationMessage,
      valid: e.target.validity.valid,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddCard({
      name: name.value,
      link: link.value,
    })
      .then(() => {
        handleClear();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleClear() {
    setName({
      value: '',
      errorMessage: '',
      valid: false,
    });
    setLink({
      value: '',
      errorMessage: '',
      valid: false,
    });
  }

  React.useEffect(() => {
    if (!isOpen) {
      handleClear();
    }
  }, [isOpen]);

  React.useEffect(() => {
    setValidForm(name.valid && link.valid);
  }, [name, link]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      closeAllPopups={closeAllPopups}
      onSubmit={handleSubmit}
      name="add"
      title="Новое место"
    >
      <input
        value={name.value || ''}
        onChange={handleChangeName}
        className={`input ${name.errorMessage && 'input_error'}`}
        id="popup__input_card-name"
        name="name"
        minLength="2"
        maxLength="30"
        type="text"
        placeholder="Название"
        required
      />
      <span className="input-error-message" id="popup__input_card-name-error">
        {name.errorMessage}
      </span>
      <input
        value={link.value || ''}
        onChange={handleChangeLink}
        className={`input ${link.errorMessage && 'input_error'}`}
        id="popup__input_card-link"
        name="link"
        type="url"
        pattern="https?://\S+"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="input-error-message" id="popup__input_card-link-error">
        {link.errorMessage}
      </span>
      <button
        className={`button button__sabmit button_type_add-card ${
          !validForm && 'button_disabled'
        }`}
        disabled={!validForm}
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

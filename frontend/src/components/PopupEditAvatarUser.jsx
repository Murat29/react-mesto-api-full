import React from 'react';
import PopupWithForm from './PopupWithForm';
import PropTypes from 'prop-types';

function PopupEditAvatarUser({ isOpen, closeAllPopups, onUpdateAvatar }) {
  const [link, setLink] = React.useState({
    value: '',
    errorMessage: '',
    valid: false,
  });

  function handleChange(e) {
    setLink({
      value: e.target.value,
      errorMessage: e.target.validationMessage,
      valid: e.target.validity.valid,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: link.value,
    })
      .then(() => {
        handleClear();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleClear() {
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

  return (
    <PopupWithForm
      isOpen={isOpen}
      closeAllPopups={closeAllPopups}
      onSubmit={handleSubmit}
      name="edit-avatar"
      title="Обновить аватар"
    >
      <input
        value={link.value || ''}
        onChange={handleChange}
        className={`input ${link.errorMessage && 'input_error'}`}
        id="popup__input_user-avatar"
        name="avatar_user"
        placeholder="Ссылка на аватар"
        pattern="https?://\S+"
        type="url"
        required
      />
      <span className="input-error-message" id="popup__input_user-avatar-error">
        {link.errorMessage}
      </span>
      <button
        className={`button button__sabmit button_type_save  ${
          !link.valid && 'button_disabled'
        }`}
        disabled={!link.valid}
        type="submit"
      >
        Сохранить
      </button>
    </PopupWithForm>
  );
}

PopupEditAvatarUser.propTypes = {
  isOpen: PropTypes.bool,
  closeAllPopups: PropTypes.func,
  onUpdateAvatar: PropTypes.func,
};

export default PopupEditAvatarUser;

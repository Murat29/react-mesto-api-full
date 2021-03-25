import React from "react";
import PopupWithForm from "./PopupWithForm";
import PropTypes from "prop-types";

function PopupEditAvatarUser({ isOpen, closeAllPopups, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    }).then(() => {
      handleClear();
    });
  }

  function handleClear() {
    avatarRef.current.value = "";
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
        ref={avatarRef}
        className="popup__input"
        id="popup__input_user-avatar"
        name="avatar_user"
        placeholder="Ссылка на аватар"
        type="url"
        required
      />
      <span className="popup__input-error" id="popup__input_user-avatar-error">
        Вы пропустили это поле.
      </span>
      <button className="button button__sabmit button_type_save" type="submit">
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

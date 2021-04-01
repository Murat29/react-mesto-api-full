import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import PropTypes from "prop-types";

function PopupEditUserInfo({ isOpen, closeAllPopups, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [job, setJob] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeJob(e) {
    setJob(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setJob(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: name,
      about: job,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      closeAllPopups={closeAllPopups}
      onSubmit={handleSubmit}
      name="edit"
      title="Редактировать профиль"
    >
      <input
        value={name || ""}
        onChange={handleChangeName}
        className="popup__input"
        id="popup__input_user-name"
        name="name_user"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        type="text"
        required
      />
      <span className="popup__input-error" id="popup__input_user-name-error">
        Вы пропустили это поле.
      </span>
      <input
        value={job || ""}
        onChange={handleChangeJob}
        className="popup__input"
        id="popup__input_user-job"
        name="job_user"
        minLength="2"
        maxLength="200"
        placeholder="Род деятельности"
        type="text"
        required
      />
      <span className="popup__input-error" id="popup__input_user-job-error">
        Вы пропустили это поле.
      </span>
      <button className="button button__sabmit button_type_save" type="submit">
        Сохранить
      </button>
    </PopupWithForm>
  );
}

PopupEditUserInfo.propTypes = {
  isOpen: PropTypes.bool,
  closeAllPopups: PropTypes.func,
  onUpdateUser: PropTypes.func,
};

export default PopupEditUserInfo;

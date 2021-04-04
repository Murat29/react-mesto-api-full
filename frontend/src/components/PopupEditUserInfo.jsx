import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import PropTypes from 'prop-types';

function PopupEditUserInfo({ isOpen, closeAllPopups, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState({
    value: '',
    errorMessage: '',
    valid: true,
  });
  const [job, setJob] = React.useState({
    value: '',
    errorMessage: '',
    valid: true,
  });
  const [validForm, setValidForm] = React.useState(false);

  function handleChangeName(e) {
    setName({
      value: e.target.value,
      errorMessage: e.target.validationMessage,
      valid: e.target.validity.valid,
    });
  }

  function handleChangeJob(e) {
    setJob({
      value: e.target.value,
      errorMessage: e.target.validationMessage,
      valid: e.target.validity.valid,
    });
  }

  React.useEffect(() => {
    setName({
      ...name,
      value: currentUser.name,
    });
    setJob({
      ...job,
      value: currentUser.about,
    });
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: name.value,
      about: job.value,
    });
  }

  React.useEffect(() => {
    if (!isOpen) {
      setName({
        ...name,
        errorMessage: '',
      });

      setJob({
        ...job,
        errorMessage: '',
      });
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (currentUser.name === name.value && currentUser.about === job.value) {
      setValidForm(false);
    } else {
      setValidForm(name.valid && job.valid);
    }
  }, [name, job]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      closeAllPopups={closeAllPopups}
      onSubmit={handleSubmit}
      name="edit"
      title="Редактировать профиль"
    >
      <input
        value={name.value || ''}
        onChange={handleChangeName}
        className={`input ${name.errorMessage && 'input_error'}`}
        id="popup__input_user-name"
        name="name_user"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        type="text"
        required
      />
      <span className="input-error-message" id="popup__input_user-name-error">
        {name.errorMessage}
      </span>
      <input
        value={job.value || ''}
        onChange={handleChangeJob}
        className={`input ${job.errorMessage && 'input_error'}`}
        id="popup__input_user-job"
        name="job_user"
        minLength="2"
        maxLength="200"
        placeholder="Род деятельности"
        type="text"
        required
      />
      <span className="input-error-message" id="popup__input_user-job-error">
        {job.errorMessage}
      </span>
      <button
        className={`button button__sabmit button_type_save  ${
          !validForm && 'button_disabled'
        }`}
        disabled={!validForm}
        type="submit"
      >
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

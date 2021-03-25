import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupConsent() {
  return (
    <PopupWithForm name="сonsent" title="Вы уверены?">
      <button className="button button__sabmit button_type_save" type="submit">
        Да
      </button>
    </PopupWithForm>
  );
}

export default PopupConsent;

import React from "react";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import PropTypes from "prop-types";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div
          className="profile__avatar-conteiner"
          onClick={props.openPopupEditAvatarUser}
        >
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар."
          />
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="button button_type_edit"
              onClick={props.openPopupEditUserInfo}
            ></button>
          </div>

          <p className="profile__job">{currentUser.about}</p>
        </div>

        <button
          className="button button_type_add"
          onClick={props.openPopupAddCard}
        ></button>
      </section>

      <section className="cards">
        <ul className="cards__container">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              setSelectedCard={props.setSelectedCard}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

Main.propTypes = {
  openPopupEditAvatarUser: PropTypes.func,
  openPopupEditUserInfo: PropTypes.func,
  cards: PropTypes.array,
  openPopupAddCard: PropTypes.func,
  setSelectedCard: PropTypes.func,
  onCardLike: PropTypes.func,
  onCardDelete: PropTypes.func,
};

export default Main;

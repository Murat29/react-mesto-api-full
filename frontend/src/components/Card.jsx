import React from 'react';
import PropTypes from 'prop-types';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card({ card, setSelectedCard, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const [isLiked, setIsLiked] = React.useState(false);

  React.useEffect(() => {
    setIsLiked(card.likes.some((i) => i === currentUser._id));
  }, [card]);

  function handleCardImgClick() {
    setSelectedCard({ link: card.link, name: card.name });
  }

  function handleCardLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  return (
    <li className="cards__card">
      <img
        onClick={handleCardImgClick}
        src={card.link}
        alt={card.name}
        className="cards__image"
      />
      <button
        onClick={handleDeleteClick}
        className={`button button_type_delete ${isOwn && 'button_visible'}`}
      />

      <div className="cards__inner">
        <h2 className="cards__title">{card.name}</h2>

        <div className="card__like-container">
          <button
            className={`button button_type_like ${isLiked && 'button_active'}`}
            onClick={handleCardLikeClick}
          />
          <span className="card__like-number">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

Card.propTypes = {
  card: PropTypes.object,
  setSelectedCard: PropTypes.func,
  onCardLike: PropTypes.func,
  onCardDelete: PropTypes.func,
};

export default Card;

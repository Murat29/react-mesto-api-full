import React from 'react';
import { Switch, Route, useHistory, withRouter } from 'react-router-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import InfoTooltip from './InfoTooltip.jsx';
import Footer from './Footer.jsx';
import PopupEditUserInfo from './PopupEditUserInfo.jsx';
import PopupAddCard from './PopupAddCard.jsx';
import PopupEditAvatarUser from './PopupEditAvatarUser.jsx';
import PopupConsent from './PopupConsent.jsx';
import PopupImg from './PopupImg.jsx';
import api from '../utils/api.js';
import auth from '../utils/auth.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import CardsContext from '../contexts/CardsContext.js';
import ProtectedRoute from './ProtectedRoute.jsx';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(undefined);

  const [isPopupEditUserInfoOpen, setIsPopupEditUserInfoOpen] = React.useState(
    false
  );
  const [isPopupAddCardOpen, setIsPopupAddCardOpen] = React.useState(false);
  const [
    isPopupEditAvatarUserOpen,
    setIsPopupEditAvatarUserOpen,
  ] = React.useState(false);
  const [satateInfoTooltip, setSatateInfoTooltip] = React.useState({
    status: false,
    isOpen: false,
  });

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
          history.push('/');
        })
        .then(() => {
          api.getCards(token).then((res) => {
            setCards(res.reverse());
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [history]);

  function openPopupEditUserInfo() {
    setIsPopupEditUserInfoOpen(true);
  }

  function openPopupAddCard() {
    setIsPopupAddCardOpen(true);
  }

  function openPopupEditAvatarUser() {
    setIsPopupEditAvatarUserOpen(true);
  }

  function closeAllPopups() {
    setIsPopupEditUserInfoOpen(false);
    setIsPopupAddCardOpen(false);
    setIsPopupEditAvatarUserOpen(false);
    setSatateInfoTooltip({ ...satateInfoTooltip, isOpen: false });
    setSelectedCard(undefined);
  }

  function handleUpdateUser(datadUser) {
    const token = localStorage.getItem('token');
    api
      .editUser(token, datadUser)
      .then((res) => {
        setCurrentUser(res);
        setIsPopupEditUserInfoOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(dataAvatar) {
    const token = localStorage.getItem('token');
    return api.editAvatar(token, dataAvatar).then((res) => {
      setCurrentUser(res);
      setIsPopupEditAvatarUserOpen(false);
    });
  }

  function handleAddCard(dataCard) {
    const token = localStorage.getItem('token');
    return api.createCard(token, dataCard).then((dataCard) => {
      setCards([dataCard, ...cards]);
      setIsPopupAddCardOpen(false);
    });
  }

  function updateCards(newCard, IdCard) {
    const newCards = cards.map((c) => (c._id === IdCard ? newCard : c));
    return newCards;
  }

  function handleCardLike(card) {
    const token = localStorage.getItem('token');
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (isLiked) {
      api
        .deleteLike(token, card._id)
        .then((newCard) => {
          setCards(updateCards(newCard, card._id));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .putLike(token, card._id)
        .then((newCard) => {
          setCards(updateCards(newCard, card._id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(id) {
    const token = localStorage.getItem('token');
    api
      .deleteCard(token, id)
      .then(() => setCards(cards.filter((card) => card._id !== id)))
      .catch((err) => {
        console.log(err);
      });
  }

  function registration(password, email) {
    auth
      .register(password, email)
      .then(() => {
        setSatateInfoTooltip({ status: true, isOpen: true });
        history.push('/sign-in');
      })
      .catch((err) => {
        setSatateInfoTooltip({ status: false, isOpen: true });
        console.log(err);
      });
  }

  function handleLogin(password, email) {
    return auth
      .authorize(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
      })
      .then(() =>
        auth.checkToken(localStorage.getItem('token')).then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
          history.push('/');
        })
      )
      .then(() => {
        const token = localStorage.getItem('token');
        api.getCards(token).then((res) => {
          setCards(res.reverse());
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header userEmail={currentUser.email} />
      <CardsContext.Provider value={cards}>
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            openPopupEditUserInfo={openPopupEditUserInfo}
            openPopupAddCard={openPopupAddCard}
            openPopupEditAvatarUser={openPopupEditAvatarUser}
            setSelectedCard={setSelectedCard}
            cards={cards}
            setCards={setCards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Route path="/sign-up">
            <Register registration={registration} />
          </Route>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
        </Switch>
      </CardsContext.Provider>

      <InfoTooltip
        satateInfoTooltip={satateInfoTooltip}
        closeAllPopups={closeAllPopups}
      />
      <Footer />
      <PopupEditUserInfo
        isOpen={isPopupEditUserInfoOpen}
        closeAllPopups={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <PopupAddCard
        isOpen={isPopupAddCardOpen}
        closeAllPopups={closeAllPopups}
        onAddCard={handleAddCard}
      />
      <PopupEditAvatarUser
        isOpen={isPopupEditAvatarUserOpen}
        closeAllPopups={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <PopupConsent />
      <PopupImg selectedCard={selectedCard} closeAllPopups={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);

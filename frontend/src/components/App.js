import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Register from "./Register.js";
import Login from "./Login.js";
import InfoTooltip from "./InfoTooltip.js";
import Footer from "./Footer.js";
import PopupEditUserInfo from "./PopupEditUserInfo.js";
import PopupAddCard from "./PopupAddCard.js";
import PopupEditAvatarUser from "./PopupEditAvatarUser.js";
import PopupConsent from "./PopupConsent.js";
import PopupImg from "./PopupImg.js";
import api from "../utils/api.js";
import auth from "../utils/auth.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import CardsContext from "../contexts/CardsContext.js";
import { Switch, Route, useHistory, withRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";

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
    isOpen: false,
    status: false,
  });

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
          history.push("/");
        })
        .then(() => {
          api.getCards().then((res) => {
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
    api
      .editUser(datadUser)
      .then((res) => {
        setCurrentUser(res);
        setIsPopupEditUserInfoOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(dataAvatar) {
    return api
      .editAvatar(dataAvatar)
      .then((res) => {
        setCurrentUser(res);
        setIsPopupEditAvatarUserOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddCard(dataCard) {
    return api
      .createCard(dataCard)
      .then((dataCard) => {
        setCards([dataCard, ...cards]);
        setIsPopupAddCardOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards(updateCards(newCard));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .putLike(card._id)
        .then((newCard) => {
          setCards(updateCards(newCard));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function updateCards(newCard) {
      const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
      return newCards;
    }
  }

  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then(() => setCards(cards.filter((card) => card._id !== id)))
      .catch((err) => {
        console.log(err);
      });
  }

  function registration(password, email) {
    auth
      .register(password, email)
      .then(() => {
        setSatateInfoTooltip({ isOpen: true, status: true });
        history.push("/sign-in");
      })
      .catch((err) => {
        setSatateInfoTooltip({ isOpen: true, status: false });
        console.log(err);
      });
  }

  function handleLogin(password, email) {
    return auth
      .authorize(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
        }
      })
      .then(() => {
        return auth.checkToken(localStorage.getItem("token")).then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
          history.push("/");
        });
      })
      .then(() => {
        api.getCards().then((res) => {
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

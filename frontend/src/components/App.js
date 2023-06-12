import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { useEffect, useState } from "react";
import { Api } from "utils/Api";
import {
  CurrentUserContext,
  currentUserObject,
} from "contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRoute";
import { AuthApi } from "utils/AuthApi";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardOpen, setIsDeleteCardOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(currentUserObject);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isErrorAuth, setIsErrorAuth] = useState(true);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleDeleteCardClick = (card) => {
    setDeletedCard(card);
    setIsDeleteCardOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardOpen(false);
    setSelectedCard(null);
    setDeletedCard(null);
    setIsInfoTooltipOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token && email == null) {
      AuthApi.checkMe(token)
        .then((response) => {
          setEmail(response.data.email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(`Ошибка загрузки изначальных данных ${err}`);
        });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (loggedIn) {
      Api.getCurrentUser()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(`Ошибка загрузки данных ${err}`);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      Api.loadCards()
        .then((userCards) => {
          setCards(userCards);
        })
        .catch((err) => {
          console.log(`Ошибка загрузки изначальных данных ${err}`);
        });
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    Api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных ${err}`);
      });
  }

  function handleCardDeleteSubmit() {
    Api.deleteCard(deletedCard._id)
      .then(() => {
        setCards(
          cards.filter((item) => {
            return item._id !== deletedCard._id;
          })
        );
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных ${err}`);
      });
  }

  function handleUpdateUser({ name, about }) {
    Api.editProfile(name, about)
      .then((user) => {
        setCurrentUser({
          name: name,
          about: about,
          avatar: user.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных ${err}`);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    Api.updateAvatar(avatar)
      .then((user) => {
        setCurrentUser({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных ${err}`);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    Api.editCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных ${err}`);
      });
  }

  function handleLogin(password, email) {
    AuthApi.signIn(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setEmail(email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных ${err}`);
        setIsErrorAuth(true);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleRegister(password, email) {
    AuthApi.signUp(password, email)
      .then((data) => {
        setIsErrorAuth(false);
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.log(`Ошибка загрузки данных ${err}`);
        setIsErrorAuth(true);
        setIsInfoTooltipOpen(true);
      });
  }
  function handeLogOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }

  const pageComponent = (
    <div>
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onDeleteCardClick={handleDeleteCardClick}
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
      ></Main>

      <Footer></Footer>

      <ImagePopup onClose={closeAllPopups} card={selectedCard}></ImagePopup>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <DeleteCardPopup
        isOpen={isDeleteCardOpen}
        onClose={closeAllPopups}
        onCardDelete={handleCardDeleteSubmit}
      />
    </div>
  );

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header email={email} handeLogOut={handeLogOut}></Header>

          <Routes>
            <Route
              path="/sign-in"
              element={
                <div className="loginContainer">
                  <Login handleLogin={handleLogin}></Login>
                </div>
              }
            />
            <Route
              path="/sign-up"
              element={
                <div className="registerContainer">
                  <Register handleRegister={handleRegister}></Register>
                </div>
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRouteElement loggedIn={loggedIn}>
                  {pageComponent}
                </ProtectedRouteElement>
              }
            />

            <Route
              path="*"
              element={
                <ProtectedRouteElement loggedIn={loggedIn}>
                  {pageComponent}
                </ProtectedRouteElement>
              }
            />
          </Routes>

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isError={isErrorAuth}
          ></InfoTooltip>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

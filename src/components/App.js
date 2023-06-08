import React from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {api} from '../utils/api.js';
import { EditProfilePopup } from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
    const [currentUser, setCurrentUser] = React.useState({});
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [cards, setCards] = React.useState([]);
    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, card]) => {
            setCurrentUser(user);
            setCards(card);
        })
        .catch(err => console.log(err))
    }, []);
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setSelectedCard({});
    }
    function handleCardClick(card) {
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    }
    function handleCardLike(card){
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.log(err))
    }
    function handleCardDelete(card){
        api.deleteCard(card._id).then(() => {
            setCards(state => state.filter((c) => c._id !== card._id))
        })
        .catch(err => console.log(err))
    }
    function handleUpdateUser(data){
        api.setUserInfo(data).then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch(err => console.log(err))
    }
    function handleUpdateAvatar(data) {
        api.setUserAvatar(data).then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch(err => console.log(err))
    }
    function handleAddPlaceSubmit(data) {
        api.addNewCard(data).then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
        .catch(err => console.log(err))
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                />
                <Footer />
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
                <PopupWithForm
                    name="delete"
                    title="Вы уверены?"
                    buttonText="Да"
                />
                <ImagePopup 
                    card={selectedCard}
                    onClose={closeAllPopups}
                    isOpen={isImagePopupOpen}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}
export default App;


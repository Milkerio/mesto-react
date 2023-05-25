import React from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
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
    return (
        <div className="page">
            <Header />
            <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
            />
            <Footer />
            <PopupWithForm
                isOpen={isEditProfilePopupOpen}
                name="edit"
                title="Редактировать профиль"
                onClose={closeAllPopups}
            >
                <input 
                type="text" 
                className="popup__input" 
                name="name" id="userName" 
                autoComplete="off" 
                minLength="2" 
                maxLength="40" 
                required 
                placeholder="Имя" 
                />
                <span 
                className="popup__error" 
                id="userName-error">
                </span>
                <input 
                type="text" 
                className="popup__input" 
                name="about" 
                id="userDescription" 
                autoComplete="off" 
                minLength="2" 
                maxLength="200" 
                required 
                placeholder="О себе" 
                />
                <span 
                className="popup__error" 
                id="userDescription-error">
                </span>
            </PopupWithForm>
            <PopupWithForm
                isOpen={isAddPlacePopupOpen}
                name="add"
                title="Новое место"
                onClose={closeAllPopups}
            >
                <input 
                type="text" 
                className="popup__input" 
                name="name" 
                id="caption" 
                autoComplete="off" 
                placeholder="Название" 
                minLength="2" 
                maxLength="30" 
                required 
                />
                <span 
                className="popup__error" 
                id="caption-error"> 
                </span>
                <input 
                type="url" 
                className="popup__input" 
                name="link" 
                id="pictureURL" 
                autoComplete="off" 
                placeholder="Ссылка на картинку" 
                required 
                />
                <span 
                className="popup__error" 
                id="pictureURL-error">
                </span>
            </PopupWithForm>
            <PopupWithForm
                isOpen={isEditAvatarPopupOpen}
                name="avatar"
                title="Обновить аватар"
                onClose={closeAllPopups}
            >
                <input 
                className="popup__input" 
                type="url" 
                name="avatar" 
                placeholder="Ссылка на аватар" 
                id="avatar" 
                required 
                />
                <span 
                className="popup__error" 
                id="avatar-error">
                </span>
            </PopupWithForm>
            <PopupWithForm
                name="delete"
                title="Вы уверены?"
            />
            <ImagePopup 
                card={selectedCard}
                onClose={closeAllPopups}
                isOpen={isImagePopupOpen}
            />
            </div>
    );
}
export default App;


import React from "react";
import {api} from '../utils/api.js';
import Card from "./Card.js";
function Main(props){
    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);
    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, card]) => {
            setUserName(user.name);
            setUserDescription(user.about);
            setUserAvatar(user.avatar);
            setCards(card);
        })
        .catch(err => console.log(err))
    }, []);
    
    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-container">
                    <img src={userAvatar} alt="Фото профиля" className="profile__avatar" onClick={props.onEditAvatar} />
                </div>
                <div className="profile__info">
                    <div className="profile__container">
                        <h1 className="profile__name">{userName}</h1>
                        <button type="button" className="button profile__edit-button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__description">{userDescription}</p>
                </div>
                <button className="button profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {
                    cards.map((card) => (
                        <Card onCardClick={props.onCardClick} card={card} key={card._id}/>
                    ))
                }
            </section>
        </main>
    )
}
export default Main;
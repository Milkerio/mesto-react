function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }
    return (
        <article className="elements__card">
            <img src={props.card.link} alt={props.card.name} className="elements__image" onClick={handleClick} />
            <button type="button" className="button elements__delete-button"></button>
            <div className="elements__group">
                <h2 className="elements__title">{props.card.name}</h2>
                <div className="elements__like-group">
                    <button className="button elements__like-button" type="button"></button>
                    <span className="elements__like-counter">{props.card.likes.length}</span>
                </div>  
            </div>
        </article>
    )
}
export default Card;
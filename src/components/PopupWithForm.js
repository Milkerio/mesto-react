function PopupWithForm(props){
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
            <h2 className="popup__title">{props.title}</h2>
            <form className="popup__form" name={props.name} id={`popup__form_${props.name}`} noValidate>
                {props.children}
                <button className="button popup__save-button" type="submit">Сохранить</button>
            </form>
            <button className="button popup__exit-button" type="button" onClick={props.onClose}></button>
        </div> 
    </div>
    )
}
export default PopupWithForm;
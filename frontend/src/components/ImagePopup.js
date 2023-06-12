function ImagePopup(props) {
    const isOpen = props.card != null ? 'popup_opened' : '';
    const cardName = isOpen ? props.card.name : '';
    const cardLink = isOpen ? props.card.link : '';
    return (
        <div className={`popup popup_image-overlay ${isOpen}`} id="image-details">
            <div className="popup__image-container">
                <button aria-label="Close" className="popup__close" type="button" onClick={props.onClose}></button>

                <img className="popup__image" alt={cardName} src={cardLink} />

                <p className="popup__subtitle">{cardName}</p>
            </div>
        </div>
    )
}

export default ImagePopup;
function PopupWithForm(props) {
  const isOpen = props.isOpen ? "popup_opened" : "";
  return (
    <fieldset className="popup__fieldset">
      <div
        className={`popup popup_type_${props.name} ${isOpen}`}
        id={props.name}
      >
        <div className="popup__container">
          <h2 className="popup__title">{props.title}</h2>
          <button
            aria-label="Close"
            className="popup__close"
            type="button"
            onClick={props.onClose}
          ></button>

          <form
            className="popup__body"
            name={props.name}
            noValidate
            onSubmit={props.onSubmit}
          >
            {props.children}

            <button className="popup__save-button" type="submit">
              {props.buttonText}
            </button>
          </form>
        </div>
      </div>
    </fieldset>
  );
}

export default PopupWithForm;

import successPath from "../images/success.svg";
import errorPath from "../images/error.svg";

function InfoTooltip(props) {
  const isOpen = props.isOpen ? "popup_opened" : "";
  const isError = props.isError;

  const errorComponent = (
    <div className="popup__tooltip">
      <img
        className="popup__tooltip-icon"
        src={errorPath}
        alt="Успешная регистрация"
      />

      <p className="popup__tooltip-text">
        Что-то пошло не так! Попробуйте ещё раз.
      </p>
    </div>
  );

  const successComponent = (
    <div className="popup__tooltip">
      <img
        className="popup__tooltip-icon"
        src={successPath}
        alt="Успешная регистрация"
      />

      <p className="popup__tooltip-text">Вы успешно зарегистрировались!</p>
    </div>
  );

  return (
    <fieldset className="popup__fieldset">
      <div className={`popup ${isOpen}`}>
        <div className="popup__container popup_tooltip-container">
          <h2 className="popup__title">{props.title}</h2>
          <button
            aria-label="Close"
            className="popup__close"
            type="button"
            onClick={props.onClose}
          ></button>

          {isError ? errorComponent : successComponent}
        </div>
      </div>
    </fieldset>
  );
}

export default InfoTooltip;

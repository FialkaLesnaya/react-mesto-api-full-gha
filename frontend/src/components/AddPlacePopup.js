import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          required
          placeholder="Название"
          type="text"
          className="popup__input"
          name="name"
          id="card-name-input"
          minLength={2}
          maxLength={30}
          value={name}
          onChange={handleNameChange}
        />

        <span className="popup__input-error card-name-input-error"></span>
      </label>

      <label className="popup__label">
        <input
          required
          placeholder="Ссылка на картинку"
          type="url"
          className="popup__input"
          name="link"
          id="link-input"
          value={link}
          onChange={handleLinkChange}
        />

        <span className="popup__input-error link-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

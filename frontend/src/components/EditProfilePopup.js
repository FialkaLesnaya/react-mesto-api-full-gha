import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          required
          placeholder="Введите имя"
          type="text"
          className="popup__input"
          id="name-input"
          name="name"
          minLength={2}
          maxLength={40}
          value={name}
          onChange={handleNameChange}
        />

        <span className="popup__input-error name-input-error"></span>
      </label>

      <label className="popup__label">
        <input
          required
          placeholder="Введите ваш вид деятельности"
          type="text"
          className="popup__input"
          id="job-input"
          name="job"
          minLength={2}
          maxLength={200}
          value={description}
          onChange={handleDescriptionChange}
        />

        <span className="popup__input-error job-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete();
  }

  return (
    <PopupWithForm
      title="Вы уверены ?"
      name="delete-card"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Да"
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default DeleteCardPopup;

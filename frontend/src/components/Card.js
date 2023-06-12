import { CurrentUserContext } from "contexts/CurrentUserContext";
import { useContext } from "react";

function Card(props) {
  const item = props.card;
  const currentUser = useContext(CurrentUserContext);
  const isOwn = item.owner._id === currentUser._id;
  const isLiked = item.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like-button ${
    isLiked && "elements__like-button-active"
  }`;

  return (
    <article className="elements__item">
      {isOwn && (
        <div
          className="elements__trash"
          onClick={() => props.onDeleteCardClick(item)}
        ></div>
      )}
      <img
        className="elements__image"
        alt={item.name}
        src={item.link}
        onClick={() => props.onCardClick(item)}
      />
      <div className="elements__info">
        <h2 className="elements__name" title="">
          {item.name}
        </h2>
        <div className="elements__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={() => props.onCardLike(item)}
          ></button>
          <span className="elements__like-count">{item.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;

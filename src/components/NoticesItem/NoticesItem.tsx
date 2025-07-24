import { useAuth } from "../../hook/useAuth";
import { useState } from "react";
import type { INoticesItem } from "../../types/notices";
import { formatDateToUkrainian } from "../../utils/formatDate";
import BaseButton from "../BaseButton/BaseButton";
import Icon from "../Icon/Icon";
import ModalNotice from "../ModalNotice/ModalNotice";
import ModalAttention from "../ModalAttention/ModalAttention";
import s from "./NoticesItem.module.css";
import { useSelector } from "react-redux";
import { selectFavorites } from "../../redux/favorite/selectors";
import { useAppDispatch } from "../../hook/useDispatch";
import {
  addFavoriteThunk,
  removeFavoriteThunk,
} from "../../redux/favorite/operations";

const NoticesItem = ({
  _id,
  imgURL,
  title,
  name,
  birthday,
  sex,
  species,
  category,
  comment,
  price,
  popularity,
}: INoticesItem) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const [isOpenNotice, setIsOpenNotice] = useState(false);
  const favoritesId = useSelector(selectFavorites);
  const dispatch = useAppDispatch();
  const isFavorites = () => favoritesId.includes(_id);
  const handleFavorite = () => {
    if (isFavorites()) {
      dispatch(removeFavoriteThunk(_id));
      return;
    }
    dispatch(addFavoriteThunk(_id));
  };
  return (
    <>
      <div className={s.imgWrapper}>
        <img src={imgURL} alt={title} width={287} className={s.image} />
      </div>
      <div className={s.titleWrapper}>
        <h3 className={s.title}>{title}</h3>
        <div className={s.starWrapper}>
          <Icon name="icon-star" size={16} className={s.starIcon} />
          <p className={s.popularity}>{popularity}</p>
        </div>
      </div>
      <ul className={s.descrWrapper}>
        <li>
          <p className={s.description}>Name</p>
          <p className={s.accent}>{name}</p>
        </li>
        <li>
          <p className={s.description}>Birthday</p>
          <p className={s.accent}>{formatDateToUkrainian(birthday)}</p>
        </li>
        <li>
          <p className={s.description}>Sex</p>
          <p className={s.accent}>{sex}</p>
        </li>
        <li>
          <p className={s.description}>Species</p>
          <p className={s.accent}>{species}</p>
        </li>
        <li>
          <p className={s.description}>Category</p>
          <p className={s.accent}>{category}</p>
        </li>
      </ul>
      <p className={s.comment}>{comment}</p>
      {price && <p className={s.price}>${price}</p>}
      <div className={s.buttonWrapper}>
        <BaseButton
          text="Learn more"
          type="button"
          onClick={() => (isLoggedIn ? setIsOpenNotice(true) : setIsOpen(true))}
          style={s.button}
        />
        <button
          type="button"
          className={s.heartBtn}
          onClick={() => {
            if (isLoggedIn) {
              handleFavorite();
              return;
            }

            setIsOpen(true);
          }}
        >
          <Icon name="icon-heart" size={18} className={s.heartIcon} />
        </button>
      </div>
      <ModalNotice
        _id={_id}
        isOpen={isOpenNotice}
        onClose={() => setIsOpenNotice(false)}
      />
      <ModalAttention isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default NoticesItem;

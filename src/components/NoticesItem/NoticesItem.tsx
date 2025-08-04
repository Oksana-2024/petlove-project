import { useAuth } from "../../hook/useAuth";
import { useState } from "react";
import { toast } from "react-toastify";
import type { INoticesItem } from "../../types/notices";
import { formatDateToUkrainian } from "../../utils/formatDate";
import BaseButton from "../BaseButton/BaseButton";
import Icon from "../Icon/Icon";
import ModalNotice from "../ModalNotice/ModalNotice";
import ModalAttention from "../ModalAttention/ModalAttention";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../hook/useDispatch";
import {
  addFavoriteThunk,
  getUser,
  removeFavoriteThunk,
} from "../../redux/user/operations";
import { selectFavorites } from "../../redux/user/selectors";
import clsx from "clsx";
import s from "./NoticesItem.module.css";
interface ItemProps extends INoticesItem {
  isFavoriteTab?: boolean;
  isViewed?: boolean;
  onClick?: () => void;
}

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
  isFavoriteTab,
  isViewed,
  onClick,
}: ItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNotice, setIsOpenNotice] = useState(false);

  const { isLoggedIn } = useAuth();
  const dispatch = useAppDispatch();

  const favoritesId = useSelector(selectFavorites);

  const isFavorites = () => favoritesId.includes(_id);

  const handleFavorite = () => {
    if (isFavorites()) {
      dispatch(removeFavoriteThunk(_id))
        .unwrap()
        .then(() => {
          dispatch(getUser());
          toast.info("Pet successfully removed from your list");
        });
      return;
    }
    dispatch(addFavoriteThunk(_id))
      .unwrap()
      .then(() => {
        dispatch(getUser());
        toast.success("Pet was successfully added to your favorites");
      });
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
          style={clsx(s.button, isViewed && s.buttonCenter)}
        />

        {!isViewed &&
          (isFavoriteTab ? (
            <button type="button" className={s.heartBtn} onClick={onClick}>
              <Icon name="icon-trash-2" size={18} className={s.trashIcon} />
            </button>
          ) : (
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
              <Icon
                name="icon-heart"
                size={18}
                className={isFavorites() ? s.heartFillIcon : s.heartIcon}
              />
            </button>
          ))}
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

import { useEffect, useState } from "react";
import { createAxios } from "../../service/api";
import { formatDateToUkrainian } from "../../utils/formatDate";
import { useAuth } from "../../hook/useAuth";
import type { INoticesItem } from "../../types/notices";
import Icon from "../Icon/Icon";
import ModalWindow from "../ModalWindow/ModalWindow";
import BaseButton from "../BaseButton/BaseButton";
import s from "./ModalNotice.module.css";
import { toast } from "react-toastify";
import { addFavoriteThunk, getUser } from "../../redux/user/operations";
import { useAppDispatch } from "../../hook/useDispatch";
import { useSelector } from "react-redux";
import { selectFavorites } from "../../redux/user/selectors";

interface IModalNotice {
  onClose: () => void;
  isOpen: boolean;
  _id: string;
}

const ModalNotice = ({ onClose, isOpen, _id }: IModalNotice) => {
  const [data, setData] = useState<INoticesItem | null>(null);
  const { token } = useAuth();
  const dispatch = useAppDispatch();
  const favoritesId = useSelector(selectFavorites);

  const isFavorites = () => favoritesId.includes(_id);

  const fetchNoticeById = async () => {
    try {
      const { data } = await createAxios(token).get(`/notices/${_id}`);

      if (!data) {
        throw new Error(`Failed to fetch car with id ${_id}`);
      }

      setData(data);
    } catch (error) {
      console.error("Error fetching car:", error);
      throw error;
    }
  };

  const handleFavorite = () => {
    if (isFavorites()) {
      return toast.info("This pet is already in your favorites");
    } else {
      dispatch(addFavoriteThunk(_id))
        .unwrap()
        .then(() => {
          dispatch(getUser());
          toast.success("Pet was successfully added to your favorites");
        });
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    fetchNoticeById();
  }, [_id, isOpen]);

  return (
    <ModalWindow closeModal={onClose} modalIsOpen={isOpen} className={s.modal}>
      <div className={s.imgWrapper}>
        <img
          src={data?.imgURL}
          alt={data?.title}
          width={120}
          className={s.img}
        />
        <p className={s.category}>{data?.category}</p>
      </div>
      <h3 className={s.title}>{data?.title}</h3>
      <div className={s.popularityWrapper}>
        <div className={s.starWrapper}>
          <Icon
            name="icon-star"
            size={16}
            className={
              !!data?.popularity && data?.popularity > 0
                ? s.iconStar
                : s.iconNotStar
            }
          />
          <Icon
            name="icon-star"
            size={16}
            className={
              !!data?.popularity && data?.popularity > 1
                ? s.iconStar
                : s.iconNotStar
            }
          />
          <Icon
            name="icon-star"
            size={16}
            className={
              !!data?.popularity && data?.popularity > 2
                ? s.iconStar
                : s.iconNotStar
            }
          />
          <Icon
            name="icon-star"
            size={16}
            className={
              !!data?.popularity && data?.popularity > 3
                ? s.iconStar
                : s.iconNotStar
            }
          />
          <Icon
            name="icon-star"
            size={16}
            className={
              !!data?.popularity && data?.popularity > 4
                ? s.iconStar
                : s.iconNotStar
            }
          />
        </div>
        <p className={s.popularity}>{data?.popularity}</p>
      </div>
      <ul className={s.descrWrapper}>
        <li>
          <p className={s.description}>Name</p>
          <p className={s.accent}>{data?.name}</p>
        </li>
        <li>
          <p className={s.description}>Birthday</p>
          <p className={s.accent}>
            {formatDateToUkrainian(data?.birthday as string)}
          </p>
        </li>
        <li>
          <p className={s.description}>Sex</p>
          <p className={s.accent}>{data?.sex}</p>
        </li>
        <li>
          <p className={s.description}>Species</p>
          <p className={s.accent}>{data?.species}</p>
        </li>
      </ul>
      <p className={s.comment}>{data?.comment}</p>
      {data?.price ? (
        <p className={s.price}>${data?.price}</p>
      ) : (
        <p className={s.price}>$0</p>
      )}
      <div className={s.buttonWrapper}>
        <BaseButton
          text="Add to"
          icon="icon-heart"
          style={s.addBtn}
          iconStyle={s.iconHeart}
          onClick={handleFavorite}
        />
        <a href="mailto:example@email.com" className={s.contact}>
          Contact
        </a>
      </div>
    </ModalWindow>
  );
};

export default ModalNotice;

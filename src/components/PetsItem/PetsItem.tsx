import { useAppDispatch } from "../../hook/useDispatch";
import { deletePetById } from "../../redux/user/operations";
import type { IMyPet } from "../../types/pets";
import { formatDateToUkrainian } from "../../utils/formatDate";
import Icon from "../Icon/Icon";
import s from "./PetsItem.module.css";

const PetsItem = ({
  title,
  name,
  birthday,
  sex,
  species,
  imgURL,
  _id,
}: IMyPet) => {
  const dispatch = useAppDispatch();
  const onDeletePet = () => {
    dispatch(deletePetById(_id as string));
  };
  return (
    <>
      <img src={imgURL} alt="Pet's photo" width={66} className={s.image} />
      <div>
        <h3 className={s.title}>{title}</h3>
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
        </ul>
      </div>
      <button type="button" className={s.trashBtn} onClick={onDeletePet}>
        <Icon name="icon-trash-2" size={16} className={s.trashIcon} />
      </button>
    </>
  );
};

export default PetsItem;

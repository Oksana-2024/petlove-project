import { Link } from "react-router-dom";
import s from "./PetsBlock.module.css";
import Icon from "../Icon/Icon";
import PetsList from "../PetsList/PetsList";

const PetsBlock = () => {
  return (
    <div className={s.petsBlock}>
      <div className={s.titleWrapper}>
        <h3 className={s.title}>My pets</h3>
        <Link to="/add-pet" className={s.linkAddPet}>
          Add pet <Icon name="icon-plus" size={18} className={s.plusIcon} />
        </Link>
      </div>
      <PetsList />
    </div>
  );
};

export default PetsBlock;

import { Link } from "react-router-dom";
import s from "./PetsBlock.module.css";
import Icon from "../Icon/Icon";
import PetsList from "../PetsList/PetsList";
import BaseButton from "../BaseButton/BaseButton";
import { useState } from "react";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction";

const PetsBlock = () => {
  const [isLogout, setIsLogout] = useState(false);
  return (
    <div className={s.petsBlock}>
      <div className={s.titleWrapper}>
        <h3 className={s.title}>My pets</h3>
        <Link to="/add-pet" className={s.linkAddPet}>
          Add pet <Icon name="icon-plus" size={18} className={s.plusIcon} />
        </Link>
      </div>
      <PetsList />
      <BaseButton
        text="Log out"
        type="button"
        style={s.logoutBtn}
        onClick={() => setIsLogout(true)}
      />
      <ModalApproveAction
        isOpen={isLogout}
        onClose={() => setIsLogout(false)}
      />
    </div>
  );
};

export default PetsBlock;

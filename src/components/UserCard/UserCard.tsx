import s from "./UserCard.module.css";

import Icon from "../Icon/Icon";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import ModalEditUser from "../ModalEditUser/ModalEditUser";
import { useState } from "react";

const UserCard = () => {
  const user = useSelector(selectUser);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <div className={s.userCardBlock}>
      <div className={s.userBlockWrapper}>
        <div className={s.userWrapper}>
          <span className={s.text}>User</span>
          <Icon name="icon-user" size={18} className={s.littleUserIcon} />
        </div>
        <div className={s.userIconWrapper}>
          {user.avatar ? (
            <div>
              {" "}
              <img width={94} src={user.avatar} className={s.avatarImg} />
            </div>
          ) : (
            <Icon name="icon-user" className={s.userIcon} size={40} />
          )}
        </div>
        <button
          type="button"
          className={s.editIconWrapper}
          onClick={() => setIsEditModalOpen(true)}
        >
          <Icon name="icon-edit-2" size={18} className={s.editIcon} />
        </button>
      </div>
      <div className={s.listWrapper}>
        <h3 className={s.titleList}>My information</h3>
        <ul className={s.list}>
          <li className={s.listItem}>{user.name}</li>
          <li className={s.listItem}>{user.email}</li>
          <li className={s.listItem}>{user.phone ? user.phone : "+380"}</li>
        </ul>
      </div>
      {isEditModalOpen && (
        <ModalEditUser
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UserCard;

import { useState } from "react";
import BaseButton from "../BaseButton/BaseButton";
import Icon from "../Icon/Icon";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction";
import s from "./UserNav.module.css";
import { useSelector } from "react-redux";
import { selectName } from "../../redux/user/selectors";
import useMedia from "../../hook/useMedia";

const UserNav = () => {
  const [isLogout, setIsLogout] = useState(false);
  const user = useSelector(selectName);
  const { isBigScreen } = useMedia();

  return (
    <>
      <div className={s.userNav}>
        {isBigScreen && (
          <BaseButton
            text="Log out"
            type="button"
            style={s.logoutBtn}
            onClick={() => setIsLogout(true)}
          />
        )}
        <button
          className={s.profileBtn}
          type="button"
          aria-label="User profile open"
          onClick={() => {}}
        >
          <Icon name="icon-user" className={s.userIcon} />
        </button>
        <p className={s.userName}>{user}</p>
      </div>
      <ModalApproveAction
        isOpen={isLogout}
        onClose={() => setIsLogout(false)}
      />
    </>
  );
};

export default UserNav;

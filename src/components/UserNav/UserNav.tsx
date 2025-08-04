import { useState } from "react";
import BaseButton from "../BaseButton/BaseButton";
import Icon from "../Icon/Icon";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction";
import { useSelector } from "react-redux";
import { selectAvatar, selectName } from "../../redux/user/selectors";
import useMedia from "../../hook/useMedia";
import { Link } from "react-router-dom";
import s from "./UserNav.module.css";

const UserNav = () => {
  const [isLogout, setIsLogout] = useState(false);
  const user = useSelector(selectName);
  const avatar = useSelector(selectAvatar);
  const { isDesktop, isMobile } = useMedia();

  return (
    <>
      <div className={s.userNav}>
        {isDesktop && (
          <BaseButton
            text="Log out"
            type="button"
            style={s.logoutBtn}
            onClick={() => setIsLogout(true)}
          />
        )}
        <Link
          to="/profile"
          className={s.profileBtn}
          aria-label="User profile open"
        >
          {avatar ? (
            <img width={40} height={40} src={avatar} className={s.avatar} />
          ) : (
            <Icon name="icon-user" className={s.userIcon} />
          )}
        </Link>
        {!isMobile && <p className={s.userName}>{user}</p>}
      </div>
      <ModalApproveAction
        isOpen={isLogout}
        onClose={() => setIsLogout(false)}
      />
    </>
  );
};

export default UserNav;

import BaseButton from "../BaseButton/BaseButton";
import Icon from "../Icon/Icon";
import s from "./UserNav.module.css";

const UserNav = () => {
  return (
    <>
      <BaseButton
        text="Log out"
        type="button"
        style={s.logoutBtn}
        onClick={() => console.log("logout mobile")}
      />
      <button
        className={s.profileBtn}
        type="button"
        aria-label="User profile open"
        onClick={() => {}}
      >
        <Icon name="icon-user" className={s.userIcon} />
      </button>
    </>
  );
};

export default UserNav;

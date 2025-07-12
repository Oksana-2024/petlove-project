import { NavLink } from "react-router-dom";
import clsx from "clsx";
import s from "./Navigation.module.css";

interface INavigation {
  className?: string;
  onClick?: () => void;
  variant: boolean;
}

const Navigation = ({ className, onClick, variant }: INavigation) => {
  const getLinkClass = () => {
    if (variant) {
      const activeStyle = ({ isActive }: { isActive: boolean }) =>
        clsx(s.link, isActive && s.active);
      return activeStyle;
    }

    const activeStyle = ({ isActive }: { isActive: boolean }) =>
      clsx(s.linkModal, isActive && s.activeModal);
    return activeStyle;
  };

  return (
    <ul className={clsx(s.list, className)} onClick={onClick}>
      <li>
        <NavLink to="/news" className={getLinkClass()}>
          News
        </NavLink>
      </li>
      <li>
        <NavLink to="/notices" className={getLinkClass()}>
          Find pet
        </NavLink>
      </li>
      <li>
        <NavLink to="/friends" className={getLinkClass()}>
          Our friends
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;

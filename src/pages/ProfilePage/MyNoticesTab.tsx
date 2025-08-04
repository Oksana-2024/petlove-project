import clsx from "clsx";
import s from "./MyNoticesTab.module.css";

import { NavLink, Outlet } from "react-router-dom";

const MyNoticesTab = () => {
  const activeStyle = ({ isActive }: { isActive: boolean }): string => {
    return clsx(s.link, isActive && s.active);
  };

  return (
    <>
      <nav className={s.navList}>
        <NavLink to="" end className={activeStyle}>
          My favorite pets
        </NavLink>
        <NavLink to="viewed" className={activeStyle}>
          Viewed
        </NavLink>
      </nav>

      <Outlet />
    </>
  );
};

export default MyNoticesTab;

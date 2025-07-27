import { Link } from "react-router-dom";
import s from "./AuthNav.module.css";
import clsx from "clsx";
interface IAuthNav {
  login?: string;
  register?: string;
  className?: string;
}

const AuthNav = ({ login, register, className }: IAuthNav) => {
  return (
    <nav className={clsx(s.navLink, className)}>
      <Link to="/login" className={clsx(s.loginLink, login)}>
        Log In
      </Link>
      <Link to="/register" className={clsx(s.registerLink, register)}>
        Registration
      </Link>
    </nav>
  );
};

export default AuthNav;

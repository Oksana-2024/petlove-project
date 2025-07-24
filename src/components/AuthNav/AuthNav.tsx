import { Link } from "react-router-dom";
import s from "./AuthNav.module.css";

const AuthNav = () => {
  return (
    <nav className={s.navLink}>
      <Link to="/login" className={s.loginLink}>
        Log In
      </Link>
      <Link to="/register" className={s.registerLink}>
        Registration
      </Link>
    </nav>
  );
};

export default AuthNav;

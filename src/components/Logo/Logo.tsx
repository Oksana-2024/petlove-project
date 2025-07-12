import clsx from "clsx";
import Icon from "../Icon/Icon";
import s from "./Logo.module.css";
interface ILogo {
  link?: string;
  logo?: string;
}

const Logo = ({ link, logo }: ILogo) => {
  return (
    <a
      href="/home"
      aria-label="Petlove homepage"
      className={clsx(s.logoLink, link)}
    >
      petl
      <Icon name="icon-heart" size={17} className={clsx(s.iconLogo, logo)} />
      ve
    </a>
  );
};

export default Logo;

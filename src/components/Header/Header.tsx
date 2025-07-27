import useMedia from "../../hook/useMedia";
import Container from "../Container/Container";
import Icon from "../Icon/Icon";
import Navigation from "../Navigation/Navigation";
import Logo from "../Logo/Logo";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useState } from "react";
import { useAuth } from "../../hook/useAuth";
import UserNav from "../UserNav/UserNav";
import AuthNav from "../AuthNav/AuthNav";
import clsx from "clsx";
import s from "./Header.module.css";

interface IHeader {
  className?: string;
}
const Header = ({ className }: IHeader) => {
  const { isMobile, isBigScreen, isDesktop, isTablet, isSmallScreen } =
    useMedia();
  const [isOpen, setIsOpen] = useState(false);

  const { isLoggedIn } = useAuth();

  const handleOpenMenu = () => {
    setIsOpen(true);
  };
  return (
    <header className={s.page}>
      <Container className={s.header}>
        <div className={clsx(s.headerWrapper, className)}>
          <Logo link={s.logo}/>
      <div className={s.tabletWrapper}>
            {isTablet && isLoggedIn && <UserNav />}
            {isTablet && (
              <button
                className={s.menuBtn}
                type="button"
                onClick={handleOpenMenu}
                aria-label="Open menu"
              >
                <Icon name="icon-menu" size={32} className={s.iconMenu} />
              </button>
            )}
      </div>
          {isMobile && (
            <div className={s.authMenuWrapper}>
              {isLoggedIn && (
                <button
                  className={s.profileBtn}
                  type="button"
                  aria-label="User profile open"
                  onClick={() => {}}
                >
                  <Icon name="icon-user" className={s.userIcon} />
                </button>
              )}
              <button
                className={s.menuBtn}
                type="button"
                onClick={handleOpenMenu}
                aria-label="Open menu"
              >
                <Icon name="icon-menu" size={32} className={s.iconMenu} />
              </button>
            </div>
          )}
          {isBigScreen && (
            <nav aria-label="Main navigation">
              <Navigation variant className={s.headerNav}  />
            </nav>
          )}
          {isDesktop && (isLoggedIn ? <UserNav /> : <AuthNav login={s.loginLink} register={s.regLink}/>)}
          {isSmallScreen && (
            <MobileMenu onClose={() => setIsOpen(false)} isOpen={isOpen} />
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;

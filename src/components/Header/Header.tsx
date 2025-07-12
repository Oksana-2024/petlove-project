import useMedia from "../../hook/useMedia";
import Container from "../Container/Container";
import Icon from "../Icon/Icon";
import Navigation from "../Navigation/Navigation";
import Logo from "../Logo/Logo";
import s from "./Header.module.css";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useState } from "react";

const Header = () => {
  const { isSmallScreen, isBigScreen } = useMedia();
  const [isOpen, setIsOpen] = useState(false);

  const isAuth = false;

  const handleOpenMenu = () => {
    setIsOpen(true);
  };
  return (
    <header className={s.page}>
      <Container className={s.header}>
        <div className={s.headerWrapper}>
          <Logo />
          {isSmallScreen && (
            <div className={s.authMenuWrapper}>
              {isAuth && (
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
              <Navigation variant/>
            </nav>
          )}
        </div>
        <MobileMenu onClose={() => setIsOpen(false)} isOpen={isOpen} />
      </Container>
    </header>
  );
};

export default Header;

import Navigation from "../Navigation/Navigation";
import Icon from "../Icon/Icon";
import { useEffect, useRef, useState } from "react";

import { useAuth } from "../../hook/useAuth";
import AuthNav from "../AuthNav/AuthNav";
import BaseButton from "../BaseButton/BaseButton";
import s from "./MobileMenu.module.css";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction";

interface IMobileMenu {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: IMobileMenu) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isApproveAction, setIsApproveAction] = useState(false);

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={modalRef} className={`${s.modal} ${isOpen && s.modalOpen}`}>
      <button className={s.closeBtn} onClick={onClose} aria-label="Close">
        <Icon name="icon-close" size={16} className={s.closeIcon} />
      </button>

      <nav>
        <Navigation onClick={onClose} className={s.listMenu} variant={false} />
      </nav>
      <div className={s.linkWrapper} onClick={onClose}>
        {isLoggedIn ? (
          <BaseButton
            text="Log out"
            type="button"
            style={s.logoutBtn}
            onClick={() => setIsApproveAction(true)}
          />
        ) : (
          <AuthNav className={s.linkStyle} />
        )}
      </div>
      {isApproveAction && (
        <ModalApproveAction
          isOpen={isApproveAction}
          onClose={() => setIsApproveAction(false)}
        />
      )}
    </div>
  );
};

export default MobileMenu;

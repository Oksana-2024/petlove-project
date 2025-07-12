import { type ReactNode } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
import { noScrollDisable, noScrollEnable } from "../../helpers/noScroll";
import clsx from "clsx";
import s from "./ModalWindow.module.css";
import Icon from "../Icon/Icon";

interface IModalWindow {
  children: ReactNode;
  modalIsOpen: boolean;
  className?: string;
  closeModal: () => void;
}

const ModalWindow = ({
  children,
  modalIsOpen,
  className,
  closeModal,
}: IModalWindow) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      closeTimeoutMS={300}
      className={{
        base: s.modalBase,
        afterOpen: s.modalAfterOpen,
        beforeClose: s.modalBeforeClose,
      }}
      overlayClassName={{
        base: s.overlayBase,
        afterOpen: s.overlayAfterOpen,
        beforeClose: s.overlayBeforeClose,
      }}
      ariaHideApp={false}
      onAfterOpen={noScrollEnable}
      onAfterClose={noScrollDisable}
    >
      <button className={s.closeBtn} onClick={closeModal} aria-label="Close">
        <Icon name="icon-close" size={16} className={s.closeIcon} />
      </button>
      <div className={clsx(s.modal, className)}>{children}</div>
    </Modal>
  );
};
export default ModalWindow;
